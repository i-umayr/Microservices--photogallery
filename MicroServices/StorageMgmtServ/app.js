const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Storage } = require("./models/StorageSchema");
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
      const storage = await Storage.findOne({ userId });
      if (!storage) {
        const initialStorage = new Storage({
          userId,
          totalStorage: 10000,
          UsedStorage: 0,
          FreeStorage: 10000,
        });

        await initialStorage.save();
        console.log("storage Added")
      }
    } catch (error) {
      console.error("Error handling UserCreated event:", error.message);
    }
  }

  if (type === "PhotoAdded" || type === "PhotoRemoved") {
    try {
      const { userId, photoSize } = data;

      const userStorage = await Storage.findOne({ userId });

      if (!userStorage) {
        return res.status(404).json({ error: "User not found" });
      }

      if (type === "PhotoAdded") {
        userStorage.UsedStorage += photoSize;
        userStorage.FreeStorage -= photoSize;
      } else if (type === "PhotoRemoved") {
        userStorage.UsedStorage -= photoSize;
        userStorage.FreeStorage += photoSize;
      }

      await userStorage.save();

      await axios.post("http://localhost:4010/events", {
        type: "StorageUpdated",
        data: { userId, storageDetails: userStorage },
      });
    } catch (error) {
      console.error(
        "Error handling PhotoAdded/PhotoRemoved event:",
        error.message
      );
    }
  }

  res.send({});
});

const port = process.env.PORT || 4003;

app.listen(port, () =>
  console.log(`Storage service Server up and running on port ${port}`)
);
