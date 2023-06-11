
//--Require
require('dotenv').config();

const appConfig = require("../common/appConfig");
const {Survey} = require("../models/survey/survey");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
 

async function deleteSurvey (req,res) {
  try {
  debugger;
    // const user= req.user;
    const userId  = req.user._id;
    const quizId= req.body.quizId;

    const r = await Survey.deleteOne({ _id: quizId , userId });
    // const surveys = await Survey.find({ userId });
    return res.status(200).json({ msg : "deleted" });
 
//----------------------------------
  } catch(error) {
    // return res.status(400).json({msg : "failed to delete", error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}


module.exports = deleteSurvey;
