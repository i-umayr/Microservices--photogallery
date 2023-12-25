const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { View } = require("./models/ViewSchema");
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
      const { userId,username,email } = data;
      const view = await View.findOne({ userId });
      if (!view) {
        const defaultViewData = {
          userId: userId,
          username: username,
          email: email,
          gallery: {
            freeStorage: 10000, 
            freeBandwidth: 25000, 
            images: [],
          },
          storage: {
            totalStorage: 10000, 
            usedStorage: 0, 
            freeStorage: 10000, 
          },
          usage: {
            totalUsage: 0, 
            dailyUsage: 0,
          },
        };
  
        const newView = new View(defaultViewData);
        await newView.save();
  
        console.log(`View created for user: ${data.userId}`);
      }
      
    } catch (error) {
      console.error("Error creating view:", error);
      res.status(500).send("Error creating view");
    }
  }
  res.send({});
});


const port = process.env.PORT || 4005;

app.listen(port,()=>console.log(`View service Server up and running on port ${port}`));