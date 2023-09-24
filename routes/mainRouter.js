
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require("../models/user.js");
const FBISE9th = require("../models/FBISE9th.js");

/////////////////////////////////////////////////
const mainRouter = express.Router();
/////////////////////////////////////////////////
/////////////////////////////////////////////////
mainRouter.post("/register" , async function(req,res) {
try{
// debugger;
const email = req.body.email;
const passwordPlain = req.body.password;

const password = await bcrypt.hash(passwordPlain,3);
    const user = new  User({
    email,
    password
    });
    await user.save();
    return res.status(200).json({msg : "account created successfully"});
}catch(error){
        if (error.code == 11000){
        return res.status(400).json({status : "error" , msg:"This email already exists"  });
        }else {
        return res.status(400).json({status : "error" , msg:"failed to register please try later."   });
        }
}
});
///////////////////////////////////////////////////////////////////////
// mainRouter.post("/verify", async function (req, res) {
//   try {
//    debugger;
//     const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
//     if (!token) {
//       return res.status(403).json({ msg: "A token is required for authentication" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // Add user to request object
//     return res.status(200).json({ msg: "Token is valid", user: decoded.user });
//   } catch (error) {
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// });
////////////////////////////////////////////////////////////////////
mainRouter.post("/login", async function (req, res) {
  try {
  // debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;
    if (!email || !passwordPlain) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (user == null) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

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
mainRouter.post("/fbise_math_9th_course", async function (req, res) {
  const syllabus = await FBISE9th.find({}, { eqs: 0,filledBy : 0 });
  return res.status(200).json({ msg: "success" , syllabus });
});
////////////////////////////////////////////////////////
mainRouter.post("/get_question", async function (req, res) {
  try {
  // debugger;
  const verifiedUser = verify(req);
  const questionId  = req.body.id;
  
    const mathQuestion = await FBISE9th.findById( questionId );
      if (mathQuestion == null){
        return res.status(404).json({ msg: "Item not found" });
      }      
      //--------------------------------
      if (mathQuestion.free){
      return res.status(200).json({ mathQuestion, msg: "success" });
      }else {
          if (!verifiedUser || verifiedUser.accountType == 'unpaid' ){
          return res.status(200).json({  msg: "This content is not free" });
          }else {
          return res.status(200).json({ mathQuestion, msg: "success" });
          }
      }

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
module.exports = mainRouter;

function verify(req) {
try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return res.status(403).json({ msg: "A token is required for authentication" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user to request object
    return { user: decoded.user };
  } catch (error) {
    return false;
  }
}



