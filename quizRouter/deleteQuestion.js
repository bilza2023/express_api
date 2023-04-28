
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

/////////////////////////////////////////////////
const quizRouter = express.Router();
quizRouter.use(auth);
/////////////////////////////////////////////////

async function deleteQuestion (req, res) {

  try {
    const user= req.user;
    const userId  = user._id;

    const questions = await Subscriber.findById(userId).select('questions');
    res.json({questions});
  } catch (err) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
    // res.status(500).json({ message: err.message });
  }
}

module.exports = deleteQuestion;