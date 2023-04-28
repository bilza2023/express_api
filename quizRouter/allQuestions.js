
//--Require
// require('dotenv').config();
// const appConfig = require("./appConfig");
// const Quiz = require("../models/quiz");
// const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
const Subscriber = require("../models/subscriber.js");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//-------------------------------------------------------
async function allQuestions (req, res){

  try {
  
      const userId  = req.userId;
      const questions = await Subscriber.findById(userId).select('questions');
      res.json({questions});
  
  } catch (err) {
      const r = await respFail(res,"unknown error","unknownError");
      return r;
  }
}


////////////////////////////////////////////////////////
module.exports = allQuestions;

////////////////////////////////////////////////////////


