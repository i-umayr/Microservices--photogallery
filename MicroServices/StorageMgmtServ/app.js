const express = require("express")
const app=express()
const cors=require("cors")
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())



app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});


const port = process.env.PORT || 4001;

app.listen(port,()=>console.log(`Auth service Server up and running on port ${port}`));