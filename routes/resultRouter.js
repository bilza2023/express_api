
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const resultRouter = express.Router();
const Result = require("../models/result");
const Quiz = require("../models/quiz");
const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
  try {
  debugger;
  const newResult = req.body.result;
  //  const { quizId, email } = newResult;
    // const existingResult = await Result.findOne({ quizId, email });
    // if (existingResult) {
      // res.status(400).json({ success: false, message: 'Result already exists' });
    // } else {
      let result = new Result(newResult);
      await result.save();
      res.json({ success: true, message: 'Result saved successfully' });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});
resultRouter.post('/analytics', async (req, res) => {
try {
    const quizId = req.body.quizId;
    const quiz =  await Quiz.findById(quizId);
    const results = await Result.find({ quizId });
    res.json({ results,quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({  msg: 'Server error' });
  }
});

resultRouter.post( "/del" , async function(req,res) {
  try {
  debugger;
    const resultId = req.body.resultId;
    const token= req.body.token;

  const userId  = await checkLogin(token);
  if (userId == null) {
    return res.status(400).json({ msg: "please register or login" });
  }
//---check if quiz has responses

    const r = await Result.deleteOne({ _id: resultId });
    return res.status(200).json({ msg : "deleted" });
//----------------------------------
  } catch(error) {
    return res.status(400).json({msg : "failed to delete"  });
  }
});

resultRouter.post("/deleteAll", async function(req, res) {
  try {
    const quizId = req.body.quizId;
    const token = req.body.token;

    const userId = await checkLogin(token);
    if (userId == null) {
      return res.status(400).json({ msg: "please register or login" });
    }

    await Result.deleteMany({ quizId: quizId });
    return res.status(200).json({ msg: "deleted all results" });
  } catch (error) {
    return res.status(400).json({ msg: "failed to delete  results" });
  }
});
////////////////////////////////////////////////////////
module.exports = resultRouter;

async function checkLogin(token) {
  try {
    // const token = req.body.token;
    if (token == null || token == "") {
      return null;
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from decoded token
    const userId = decoded.id;
    // find user by id--user still exists???
    const user = await Subscriber.findById(userId);
    
    if (!user) {
      return null;
    }
    
    return userId;
  } catch (e) {
    return null;
  }
}




