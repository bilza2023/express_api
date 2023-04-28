
require('dotenv').config();
const auth = require('../middleware/auth');

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const appConfig = require("../common/appConfig");

const express = require('express');
const resultRouter = express.Router();
const Result = require("../models/result");
const Quiz = require("../models/quiz");
const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
resultRouter.use(auth);
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
  try {
  debugger;
  const user= req.user;
  const userId  = user._id;
 
  const newResult = req.body.result;

//--total number of responses
const totalRespCount = await Result.countDocuments({userId});
// console.log("totalRespCount" , totalRespCount);
 if (totalRespCount > appConfig.MAX_RESPONSES_ALLOWED ){
    return respFail(res,`No more than ${appConfig.MAX_RESPONSES_ALLOWED} Responses are allowed to be saved`,"maxResponsesReached");
    }
//////////////////////////

  //--do not store 2 responses
  // debugger;
  
  const quizId = newResult.quizId;
    const existingResult = await Result.findOne({ quizId:newResult.quizId , email:newResult.email });
    if (existingResult) {
         return respFail(res,`Result already exists for this member`,"resultAlreadyExists");
    }
    
    
    
      newResult.userId = user._id;
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
// const user= req.user;
    // const userId  = req.userId;
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
const user= req.user;
    const userId  = req.userId;

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
   const user= req.user;
    const userId  = req.userId;
   
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





