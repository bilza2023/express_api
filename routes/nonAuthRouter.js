
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const nonAuthRouter = express.Router();

const {Survey} = require("../models/survey/survey");
const Subscriber = require("../models/subscriber.js");

/////////////////////////////////////////////////

nonAuthRouter.get("/show/:quizId" , async function(req,res) {
  try {
  // debugger;
  const quizId  = req.params.quizId;
  // console.log(quizId)
    const quiz = await Survey.findById( quizId );
      if (quiz == null){
        return res.status(404).json({ msg: "Item not found" });
      }
    
      if (quiz.published == true){
        return res.status(200).json({ quiz, msg: "success" });
      }else {
        return res.status(404).json({ msg: "Item Not Published" });
      }
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
nonAuthRouter.post("/register" , async function(req,res) {

try{
const email = req.body.email;
const passwordPlain = req.body.password;

const password = await bcrypt.hash(passwordPlain,3);
// console.log(password);
    const subscriber = new  Subscriber({
    email,
    password
    });
// console.log(subscriber);

    const newSub = await subscriber.save();
    return res.status(200).json({status : "ok"});
            // console.log(subscribers);
}catch(error){
        // console.log(error.code);
        if (error.code == 11000){
        return res.status(400).json({status : "error" , msg:"This email already exists"  });
        }else {
        return res.status(400).json({status : "error" , msg:"failed to register please try later."   });
        }
}
});

///////////////////////////////////////////////////////////////////////
nonAuthRouter.post("/login", async function (req, res) {
  try {
  // debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;

    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await Subscriber.findOne({ email });
    if (user == null) {
      return res.status(404).json({ msg: "Email address not found" });
    }

    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

      // Set Authorization with Bearer token syntax also send as token 
      //(USE BOTH)
      res.set("Authorization", `Bearer ${token}`);
      return res.status(200).json({ msg: "Login successful", token: token });
    } else {
      return res.status(401).json({  msg: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({  msg: "Login failed", error });
  }
});



////////////////////////////////////////////////////////
module.exports = nonAuthRouter;





