
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const Quiz = require("../models/quiz");
const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
const newQuiz = require('../models/new_quiz.js');
const Subscriber = require("../models/subscriber.js");


async function deleteQuiz (req,res) {
  try {
  debugger;
    const user= req.user;
    const userId  = req.user._id;
    const quizId= req.body.quizId;

//---check if quiz has responses
 const allQuizResults = await Result.find({"quizId" : quizId});
// debugger;
    if (allQuizResults.length > 0) {
       return res.status(404).json({msg : "The Quiz has responses. Failed to delete"  });
    }else{
      const r = await Quiz.deleteOne({ _id: quizId , userId });
    return res.status(200).json({ msg : "deleted" });
    }
//----------------------------------
  } catch(error) {
    // return res.status(400).json({msg : "failed to delete", error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}


module.exports = deleteQuiz;
