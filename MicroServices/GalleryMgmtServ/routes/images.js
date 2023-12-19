const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Gallery } = require("../models/GallerySchema");

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userGallery = await Gallery.findOne({ userId });

    if (!userGallery) {
      return res.status(404).json({ message: 'Gallery not found for this user' });
    }

    const convertedImages = await Promise.all(
      userGallery.images.map(async (image) => {
        const buffer = Buffer.from(image.imageData, 'base64');
        const convertedBuffer = await sharp(buffer).toFormat('png').toBuffer();
        const convertedImageData = convertedBuffer.toString('base64');
        return {
          ...image.toObject(),
          imageData: convertedImageData, 
        };
      })
    );

    return res.status(200).json({
      userId: userGallery.userId,
      freeStorage: userGallery.freeStorage,
      images: convertedImages,
    });
  } catch (error) {
    console.error('Error fetching user gallery:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/add", verifyToken, async (req, res) => {
    try {
      const { title } = req.body;
      const { file } = req.files; 
  
      if (!file) {
        return res.status(400).json({ message: 'No image file uploaded' });
      }
  
      const userGallery = await Gallery.findOne({ userId: req.user.userId });
  
      if (!userGallery) {
        return res.status(404).json({ message: 'Gallery not found for this user' });
      }
  
      // Read the image file and convert it to Base64 encoding
      const imageData = fs.readFileSync(file.path, { encoding: 'base64' });
  
      // Calculate image size
      const bytes = Buffer.from(imageData, 'base64').length;
      const kilobytes = bytes / 1024;
  
      if (kilobytes > userGallery.freeStorage) {
        return res.status(400).json({ message: 'Insufficient storage' });
      }
  
      const newImage = {
        title,
        size,
        imageData,
        // Other metadata related to the image can be added here
      };
  
      userGallery.images.push(newImage);
      userGallery.freeStorage -= size;
  
      await userGallery.save();
  
      // Emit event to the event bus at 4010
      await axios.post('http://localhost:4010/events', {
        type: 'ImageAdded',
        data: { userId: req.user.userId, imageDetails: newImage }
      });
  
      return res.status(201).json({ message: 'Image added successfully' });
    } catch (error) {
      console.error('Error adding image:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.delete("/remove/:imageId", verifyToken, async (req, res) => {
  try {
    const { imageId } = req.params;
    const userGallery = await Gallery.findOne({ userId: req.user.userId });

    if (!userGallery) {
      return res.status(404).json({ message: 'Gallery not found for this user' });
    }

    const imageToRemove = userGallery.images.id(imageId);

    if (!imageToRemove) {
      return res.status(404).json({ message: 'Image not found' });
    }

    userGallery.freeStorage += imageToRemove.size;
    imageToRemove.remove();

    await userGallery.save();

    // Emit event to the event bus at 4010
    await axios.post('http://localhost:4010/events', {
      type: 'ImageRemoved',
      data: { userId: req.user.userId, imageId }
    });

    return res.status(200).json({ message: 'Image removed successfully' });
  } catch (error) {
    console.error('Error removing image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/download/:imageId", verifyToken, async (req, res) => {
  try {
    const { imageId } = req.params;
    const userGallery = await Gallery.findOne({ userId: req.user.userId });

    if (!userGallery) {
      return res.status(404).json({ message: 'Gallery not found for this user' });
    }

    const imageToDownload = userGallery.images.id(imageId);

    if (!imageToDownload) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imageFileName = `${imageId}_${imageToDownload.title}`;
    const base64Data = imageToDownload.imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Save the image locally
    const downloadPath = path.join(__dirname, '..', 'downloads', imageFileName);
    fs.writeFileSync(downloadPath, buffer);

    return res.download(downloadPath, imageFileName, (err) => {
      if (err) {
        console.error('Error downloading image:', err);
        return res.status(500).json({ message: 'Failed to download image' });
      }
      // Remove the downloaded file after sending
      fs.unlinkSync(downloadPath);
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
