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
          totalUsage: 0,
          dailyUsage: 0,
        });
        await initialUsage.save();
        console.log("Usage Added")
      }
    } catch (error) {
      console.error("Error handling UserCreated event:", error.message);
    }
  }
  res.send({});
});


const port = process.env.PORT || 4004;

app.listen(port,()=>console.log(`Usage service Server up and running on port ${port}`));