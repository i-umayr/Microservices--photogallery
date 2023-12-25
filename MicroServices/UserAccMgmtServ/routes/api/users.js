const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


const {User}=require("../../models/UserSchema")



router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    newUser
      .save()
      .then(async (user) => {
        const jwtToken = jwt.sign(
          {id: user._id, email: user.email},
          process.env.JWT_SECRET
        );
        try{
        await axios.post("http://localhost:4010/events", {
           type: "UserCreated",
           data: {
           userId: user._id,
           username:user.username,
           email:user.email,
           password:user.password
           },
          });
        }
        catch(error){
          console.log(error)
        }
        res.json({ message: "Welcome", token: jwtToken,userId:user._id });
      })
      .catch((err) => console.log(err));

    
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  try {
    const userwithEmail = await User.findOne({ email }).exec();

    if (!userwithEmail) {
      return res
        .status(400)
        .json({ message: "Email or password does not match" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      userwithEmail.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Email or password does not match" });
    }
    const jwtToken = jwt.sign(
      { id: userwithEmail._id, email: userwithEmail.email },
      process.env.JWT_SECRET
    );
    try{
      await axios.post("http://localhost:4010/events", {
         type: "UserLoggedIn",
         data: {
         userId: userwithEmail._id,
         username:userwithEmail.username,
         email:userwithEmail.email,
         password:userwithEmail.password
         },
        });
      }
      catch(error){
        console.log(error)
      }

    res.json({ message: "Welcome Back", token: jwtToken,userId:userwithEmail._id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
