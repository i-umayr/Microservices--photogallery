const express = require("express")
const app=express()
const cors=require("cors")
const bodyParser = require('body-parser');
const mongoose = require("./config/db");
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())
const { Log } = require("./models/LogSchema");



app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {
      const { userId, username } = data;
      const log = new Log({
        userId,
        logs: [{
          message: `User ${username} created`,
        }],
      });
      await log.save();
    } catch (error) {
      console.error("Error creating log for user creation:", error);
    }
  }

  if (type === "UserLoggedIn") {
    try {
      const { userId, username } = data; 
      const log = await Log.findOne({ userId });

      if (log) {
        log.logs.push({
          message: `User ${username} logged in`,
        });
        await log.save();
      }
    } catch (error) {
      console.error("Error creating log for user login:", error);
    }
  }

  res.send({});
});


const port = process.env.PORT || 4003;

app.listen(port,()=>console.log(`Log service Server up and running on port ${port}`));