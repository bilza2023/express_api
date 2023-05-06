//--Require
require('dotenv').config();

const appConfig = require("../common/appConfig");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const Quiz = require("../models/quiz");
const newQuiz = require('../models/new_quiz.js');


async function createProject (req, res) {
   try {

   const title = req.body.title;
   const quizType  = req.body.quizType;

   const user= req.user;
   const userId  = user._id;

///////////////////---limit new quiz--////
if (userId !== process.env.OWNER_ID ){
const prev = await Quiz.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
    // return res.status(400).json({ msg: ""});
    }
}
//////--limit ends
   const newQuizObj = newQuiz;
   newQuizObj.title =  title;
   newQuizObj.quizType =  quizType;

   newQuizObj.saveResponse =  true;
   newQuizObj.userId = userId; // importantay
  
    let quiz = new Quiz( newQuizObj );
      //  debugger;
    await quiz.save();
    const finalOkResp = await respOk(res,"new quiz created",{ quiz });
    return finalOkResp;
  
  } catch (error) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}



module.exports  = createProject;