
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const Quiz = require("../models/quiz");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");





async function updateQuiz(req, res){

  try {
    const quiz = req.body.quiz; // the updated fields
    const id = quiz._id; // the updated fields

    // debugger;
    // const userId  = req.user._id;

    const options = { new: true, upsert: true }; 
    const updatedQuiz = await Quiz.findByIdAndUpdate( id , quiz,options);

    return res.status(200).json({ msg : "Quiz Saved",updatedQuiz });
       
  } catch (error) {
    // return res.status(400).json({ error , msg : "failed to save"});
    const r = await respFail(res,"failed to save quiz","failedToSaveQuiz");
    return r;
  }
}


module.exports = updateQuiz;
