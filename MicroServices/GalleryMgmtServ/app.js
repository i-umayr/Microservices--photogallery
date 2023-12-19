const express = require("express")
const app=express()
const cors=require("cors")
const mongoose=require("./config/db")
const bodyParser = require('body-parser');
const {Gallery}=require("./models/GallerySchema")

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())




const images = require("./routes/images");




app.use("/images",images);
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});


const port = process.env.PORT || 4002;

app.listen(port,()=>console.log(`Auth service Server up and running on port ${port}`));