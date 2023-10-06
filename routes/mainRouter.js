
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require("../models/user.js");
const FBISE9th = require("../models/FBISE9th.js");
const {MathFull} = require("../models/mathFull.js");
const {Eqs,Grid} = require("../models/mathFullEmbededSchemas.js");

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
////////////////////////////////////////////////////////////////////
mainRouter.post("/login", async function (req, res) {
  try {
  debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;
    if (!email || !passwordPlain) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (user == null) {
      return res.status(404).json({ msg: "User not found" });
    }
    const accountType = user.accountType;
    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.set("Authorization", `Bearer ${token}`);
      return res.status(200).json({ msg: "Login successful", token: token,accountType });
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
  // const verifiedUser = verify(req);
  const questionId  = req.body.id;
    const question = await MathFull.findById( questionId );
      if (question !== null && question.questionType == 'eqs'  ){
          const eqs = await Eqs.findById( question.ref );
          // question.eqs = eqs;
        return res.status(200).json({ question,eqs, msg: "success" });
      }      
      if (question !== null && question.questionType == 'grid'  ){
          const grid = await Grid.findById( question.ref );
          // question.grid = grid;
        return res.status(200).json({ question,grid, msg: "success" });
      }      
   

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
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

function verifyAdmin(req) {
try {
   debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return false;
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if ( decodedUser.status !== "admin" ){
      return false;
    }else {
      return decodedUser;
    }
  ///////////////////////  
  } catch (error) {
    return false;
  }
}



