const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Query } = require("./models/QuerySchema");
const mongoose = require("./config/db");

require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

const queries = require("./routes/queries");

app.use("/queries", queries);

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {
      const { userId, username, email } = data;
      const query = await Query.findOne({ userId });
      if (!query) {
        const defaultQueryData = {
          userId: userId,
          username: username,
          email: email,
          gallery: {
            images: [],
          },
          storage: {
            totalStorage: 10000,
            UsedStorage: 0,
            FreeStorage: 10000,
          },
          usage: {
            bandwidthTotalUsage: 0,
            bandwidthDailyUsage: 0,
            dailyLimit: 25000,
          },
        };
        const newQuery = new Query(defaultQueryData);
        await newQuery.save();

        console.log(`Query created for user: ${data.userId}`);
      }
    } catch (error) {
      console.error("Error creating Query:", error);
      res.status(500).send("Error creating Query");
    }
  }
  if (type === "ImagesAdded") {
    try {
      const { userId, imagesEv } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.gallery.images.push(...imagesEv);
        await query.save();
        console.log("Updated Query for ImagesAdded event:", userId);
      }
    } catch (error) {
      console.error("Error handling ImagesAdded event:", error.message);
    }
  }

  if (type === "ImageRemoved") {
    try {
      const { userId, imageId, imageSize } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.gallery.images = query.gallery.images.filter(
          (image) => image._id.toString() !== imageId
        );
        await query.save();
        console.log("Updated Query for ImageRemoved event:", userId);
      }
    } catch (error) {
      console.error("Error handling ImageRemoved event:", error.message);
    }
  }
  if (type === "StorageUpdated") {
    try {
      const { userId, storageDetails } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.storage = {
          ...query.storage,
          ...storageDetails,
        };
        await query.save();
        console.log("Updated Query for StorageUpdated event:", userId);
      }
    } catch (error) {
      console.error("Error handling StorageUpdated event:", error.message);
    }
  }

  if (type === "UsageUpdated") {
    try {
      const { userId, usageDetails } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.usage = {
          ...query.usage,
          ...usageDetails,
        };
        await query.save();
        console.log("Updated Query for UsageUpdated event:", userId);
      }
    } catch (error) {
      console.error("Error handling UsageUpdated event:", error.message);
    }
  }
  res.send({});
});

const port = process.env.PORT || 4005;

app.listen(port, () =>
  console.log(`Query service Server up and running on port ${port}`)
);
