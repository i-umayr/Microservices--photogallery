const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.post("/events", (req, res) => {
  const event = req.body;
  try {
    axios.post("http://localhost:4000/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    axios.post("http://localhost:4001/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    axios.post("http://localhost:4002/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    axios.post("http://localhost:4003/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    axios.post("http://localhost:4004/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    axios.post("http://localhost:4005/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error);
  }
  res.send({ status: "OK" });
});

app.listen(4010, () => {
  console.log("Event Bus Listening on 4010");
});
