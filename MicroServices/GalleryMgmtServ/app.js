const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/db");
const bodyParser = require("body-parser");
const { Gallery } = require("./models/GallerySchema");

require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

const images = require("./routes/images");

app.use("/images", images);
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;

  if (type === "UserCreated") {
    try {
      const { userId } = data;
      const existingGallery = await Gallery.findOne({ userId: userId });
      if (!existingGallery) {
        const newGallery = new Gallery({
          userId: userId,
          freeStorage: 10000, 
          freeBandwidth: 25000,
          images: [], 
        });
        await newGallery.save();

        console.log(`Gallery created for user ${data.userId}`);
      } else {
        console.log(`Gallery already exists for user ${data.userId}`);
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      return res.status(500).send("Internal Server Error");
    }
  }if (type === "StorageUpdated") {
    try {
      const { userId, storageDetails } = data;
      const existingGallery = await Gallery.findOne({ userId });

      if (!existingGallery) {
        console.log(`Gallery not found for user ${userId}`);
        return res.status(404).send("Gallery not found");
      }

      existingGallery.freeStorage = storageDetails.FreeStorage;

      await existingGallery.save();
      console.log(`Free storage updated for user ${userId}`);

    } catch (error) {
      console.error("Error updating free storage:", error.message);
      return res.status(500).send("Internal Server Error");
    }

  }
  if (type === "UsageUpdated"){
    try {
      const { userId, usageDetails } = data;
      const existingGallery = await Gallery.findOne({ userId });

      if (!existingGallery) {
        console.log(`Gallery not found for user ${userId}`);
        return res.status(404).send("Gallery not found");
      }

      existingGallery.freeBandwidth = 25000 - usageDetails.bandwidthDailyUsage; 

      await existingGallery.save();
      console.log(`Free bandwidth updated for user ${userId}`);

    } catch (error) {
      console.error("Error updating free bandwidth based on usage:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
  res.send({});
});

const port = process.env.PORT || 4002;

app.listen(port, () =>
  console.log(`Gallery service Server up and running on port ${port}`)
);
