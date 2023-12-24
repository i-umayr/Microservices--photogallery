const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { storage, cloudinary } = require("../cloudinary/index.js");
const multer = require("multer");
const upload = multer({ storage: storage });
const { Gallery } = require("../models/GallerySchema");
const formidable = require('formidable');
const fs = require('fs');
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Authorization token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image.filepath, // Path of the uploaded image
      { folder: 'photogallery' }, // Specify folder if needed
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

router.get("/:userId", verifyToken, async (req, res) => {
  console.log(req.files);
});

router.post("/add/:userId", async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async(err, fields, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred during file upload");
      return;
    }

    const userId = req.params.userId;
    const images = Object.values(files.images); 
    console.log(files)
    console.log(images)
    try {
      const imageLinks = [];
      const totalSizeKB = images.reduce((acc, image) => acc + image.size, 0) / 1024; // Total size in KB
      console.log(totalSizeKB)
      const userGallery = await Gallery.findOne({ userId });

      if (!userGallery) {
        return res.status(404).json({ error: 'User gallery not found' });
      }

      if (totalSizeKB > userGallery.freeStorage || totalSizeKB > userGallery.freeBandwidth) {
        return res.status(400).json({ error: 'Image size exceeds available storage or bandwidth' });
      }
      console.log('heree')
      for (const image of images) {
        console.log(image)
        const uploadedImage = await uploadToCloudinary(image); // Upload image to Cloudinary
        console.log(uploadedImage)
        const newImage = {
          title: image.originalFilename,
          size: image.size/1024,
          imageLink: uploadedImage.secure_url,
        };

        imageLinks.push(uploadedImage.secure_url);
        userGallery.images.push(newImage);
      }

      await userGallery.save();

      res.status(200).json({ links: imageLinks });
    }catch(error){
      
      console.error(error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  });
  });

router.delete("/remove/:imageId", verifyToken, async (req, res) => {});

router.get("/download/:imageId", verifyToken, async (req, res) => {});

module.exports = router;
