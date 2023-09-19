
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const nonAuthRouter = express.Router();
const isPublished = require('../globals/isPublished')
const {Run} = require("../models/survey/survey");
const Student = require("../models/student");
const Subscriber = require("../models/subscriber.js");
const MathQuestion = require("../models/mathQuestion.js");

/////////////////////////////////////////////////
nonAuthRouter.get("/show/:quizId" , async function(req,res) {
  try {
  debugger;
  const quizId  = req.params.quizId;
  // console.log(quizId)
    const quiz = await Run.findById( quizId );
      if (quiz == null){
        return res.status(404).json({ msg: "Item not found" });
      }
      
      const pub = isPublished(quiz.publishObj);
      // debugger;
      // console.log("isPublished" , pub);
      // return;
      if (pub.publishStatus == 'published'){
        const students = await Student.find({classId:quiz.classId})
        return res.status(200).json({ quiz,students, msg: "success" });

      }else if (pub.publishStatus == 'unpublished') {
          await Survey.deleteOne({_id:quizId});
        return res.status(404).json({ msg: "This Test was Un Published",pub });

      }else if (pub.publishStatus == 'waiting') {
        return res.status(404).json({ msg: "This Test is in Waiting",pub});
        
      }
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
nonAuthRouter.get("/math" , async function(req,res) {
  try {
  // debugger;
  const quizId  = req.query.id;
  
    const mathQuestion = await MathQuestion.findById( quizId );
      if (mathQuestion == null){
        return res.status(404).json({ msg: "Item not found" });
      }      
      return res.status(200).json({ mathQuestion, msg: "success" });

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
/////////////////////////////////////////////////
nonAuthRouter.get("/publicTests" , async function(req,res) {
  try {
      const userId = "64202224fd8518cb214bd138";
      const items = await Run.find({ userId: userId,private:false })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10); // Limit to 10 results
      if (items == null){
        return res.status(404).json({ message: "Items not found" });
      }else {
       return res.status(200).json({ items });
      }
      
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
nonAuthRouter.post("/uploadMath" , async function(req,res) {

try{

    // debugger;
    const question = req.body.question;
    // const mathQuestion = new MathQuestion(question); 
    // const q = await mathQuestion.update();
    const options = { new: true, upsert: true }; 
      const item = await MathQuestion.findByIdAndUpdate( question._id ,question,options);

    return res.status(200).json({status : "ok"});
            // console.log(subscribers);
}catch(error){
        // console.log(error.code);
        if (error.code == 11000){
        return res.status(400).json({status : "error" , msg:"Question Upload failed"  });
        }else {
        return res.status(400).json({status : "error" , msg:"failed to register please try later."   });
        }
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
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

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





