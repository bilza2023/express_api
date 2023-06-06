
require('dotenv').config();
const auth = require('../middleware/auth');

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const appConfig = require("../common/appConfig");

const express = require('express');
const resultRouter = express.Router();
const SurveyResult = require("../models/result");
const Survey = require("../models/survey");


const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
resultRouter.use(auth);
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  debugger;
  const user= req.user;
  // const userId  = user._id;
 
  const quiz = req.body.quiz;
  const quizResult = req.body.quizResult;
 
//--total number of responses
// const totalRespCount = await SurveyResult.countDocuments({userId});
// // console.log("totalRespCount" , totalRespCount);
//  if (totalRespCount > appConfig.MAX_RESPONSES_ALLOWED ){
//     return respFail(res,`No more than ${appConfig.MAX_RESPONSES_ALLOWED} Responses are allowed to be saved`,"maxResponsesReached");
//     }
//////////////////////////

  //--do not store 2 responses
  // debugger;
  // if (quiz.quizType == "quiz" ){
  //     const quizId = newResult.quizId;
  //     const existingResult = await SurveyResult.findOne({ quizId:newResult.quizId , email:newResult.email });
  //     if (existingResult) {
  //         return respFail(res,`Result already exists for this member`,"resultAlreadyExists");
  //     }
  // }
    
    
    
      // newResult.userId = user._id;
      // debugger;
      let result = new SurveyResult(quizResult);
      await result.save();
      res.status(200).json({ success: true, message: 'Result saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

resultRouter.post('/analytics', async (req, res) => {
try {
// const user= req.user;
    // const userId  = req.userId;
    const quizId = req.body.quizId;
    const quiz =  await Survey.findById(quizId);
    const results = await SurveyResult.find({ quizId });
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

    const r = await SurveyResult.deleteOne({ _id: resultId });
    return res.status(200).json({ msg : "deleted" });
//----------------------------------
  } catch(error) {
    return res.status(400).json({msg : "failed to delete"  });
  }
});

resultRouter.post("/deleteAll", async function(req, res) {
  try {
  debugger;
    const quizId = req.body.quizId;
   const user= req.user;
    const userId  = user._id;
   
    if (userId == null) {
      return res.status(400).json({ msg: "please register or login" });
    }

    await SurveyResult.deleteMany({ quizId: quizId });
    return res.status(200).json({ msg: "deleted all results" });
  } catch (error) {
    return res.status(400).json({ msg: "failed to delete  results" });
  }
});
////////////////////////////////////////////////////////
module.exports = resultRouter;





