const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Usage } = require("./models/UsageSchema");
const mongoose = require("./config/db");
const axios = require("axios");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());


app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {
      const { userId } = data;
      const usage = await Usage.findOne({ userId });
      if (!usage) {
        const initialUsage = new Usage({
          userId,
          bandwidthTotalUsage: 0,
          bandwidthDailyUsage: 0,
          dailyLimit:25000
        });
        await initialUsage.save();
        console.log("Usage Added")
      }
    } catch (error) {
      console.error("Error handling UserCreated event:", error.message);
    }
  }
  if (type === "ImagesAdded") {
    try {
      const { userId, imagesEv } = data;
      const usage = await Usage.findOne({ userId });

      if (!usage) {
        console.error("Usage not found for User:", userId);
        return res.status(404).send("Usage not found");
      }

      const totalAddedSize = imagesEv.reduce(
        (total, image) => total + image.size,
        0
      );

      usage.bandwidthTotalUsage += totalAddedSize;
      usage.bandwidthDailyUsage += totalAddedSize;

      await usage.save();
      console.log("Usage updated for ImagesAdded event:", userId);

      try {
        await axios.post("http://localhost:4010/events", {
          type: "UsageUpdated",
          data: {
            userId,
            usageDetails: {
              bandwidthTotalUsage: usage.bandwidthTotalUsage,
              bandwidthDailyUsage: usage.bandwidthDailyUsage,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error handling ImagesAdded event:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
  res.send({});
});


const port = process.env.PORT || 4004;

app.listen(port,()=>console.log(`Usage service Server up and running on port ${port}`));