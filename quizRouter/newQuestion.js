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

async function newQuestion(req, res) {

  try {
  const newQuestion = req.body.question;
  const quizId = req.body.quizId;
     
     const quiz = await Quiz.findById(quizId);
 
   quiz.questions.push(newQuestion); //--check this
    await quiz.save();

    res.status(200).json({ msg: 'Question updated successfully' ,questions :quiz.questions });
  } catch (err) {
    // console.error(err);
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}



module.exports = newQuestion;
