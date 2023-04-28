
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
// const appConfig = require("./appConfig");
const Quiz = require("../models/quiz");
// const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
// const newQuiz = require('../models/new_quiz.js');
// const Subscriber = require("../models/subscriber.js");

/////////////////////////////////////////////////
const quizRouter = express.Router();
quizRouter.use(auth);
/////////////////////////////////////////////////

async function cloneQuiz(req, res) {
  try {
  // debugger;
    const id = req.body.id;
      const user= req.user;
    const userId  = user._id;
    const title = req.body.title;
    const originalQuiz = await Quiz.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }
    const newQuiz = new Quiz(originalQuiz.toObject());
    // userId is already set
    newQuiz._id = undefined;
    newQuiz.isNew = true;
    newQuiz.title = title;
    newQuiz.createdAt = Date.now();
    await newQuiz.save();
    return res.status(200).json({ quiz: newQuiz ,msg: "Cloned.." });
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}

module.exports = cloneQuiz;