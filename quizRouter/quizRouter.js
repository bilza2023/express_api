
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

const createProject = require("./createProject");

/////////////////////////////////////////////////
const quizRouter = express.Router();
quizRouter.use(auth);
/////////////////////////////////////////////////



quizRouter.post("/new", async function(req, res) {
  //  try {
  // debugger;
   const r = await createProject(req,res);
  
  // } catch (error) {
  //   const r = await respFail(res,"unknown error","unknownError");
  //   return r;
  // }
});

////////////////////////////////////////////////////////
module.exports = quizRouter;

////////////////////////////////////////////////////////


