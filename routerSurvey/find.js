
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const Survey = require("../models/quiz");
const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
const newQuiz = require('../models/new_quiz.js');
const Subscriber = require("../models/subscriber.js");


async function find (req ,res) {

  try {
    // debugger;
    const user= req.user;
    const userId  = user._id;
    const id= req.body.quizId;
    const incommingQuiz = await Quiz.findById(id);
    if (incommingQuiz){
      // const userId = req.userId;
      // const user = await Subscriber.findById(userId);
      const incommingMembers = user.members;
    return res.status(200).json({ incommingQuiz, incommingMembers, status:"ok" });
    }
  } catch(error) {
    // return res.status(400).json({msg : "failure" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}


module.exports = find;