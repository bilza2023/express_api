require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const find = require('./find');
const {Test,Survey} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerTest = express.Router();
routerTest.use(auth);
/////////////////////////////////////////////////
 

routerTest.post("/run", async function(req, res) {
 try {
  debugger;
    const id = req.body.id;
    const userId = req.user._id;
    const title = req.body.title;

  ///////////////////---limit new quiz--////
//   if (userId !== process.env.OWNER_ID ){
//   const prev = await Survey.count({userId :userId});
//     if (prev > appConfig.MAX_QUIZ_ALLOWED ){
//     return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
//     }
//   }
  //////--limit ends

    const originalQuiz = await Test.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Test not found" });
    }
    //--Store the Test id into testId since Survey/Running will be deleted.
    originalQuiz.testId = originalQuiz._id.toString(); 

    const survey = new Survey(originalQuiz.toObject());
    // userId is already set
    survey._id = undefined;
    survey.published = true; //important
    survey.members = [{email : "aaa@msn.com" , password : "12345"}]; //important
    survey.isNew = true;
    survey.title = title; //--new title
    survey.createdAt = Date.now();
    await survey.save();
    return res.status(200).json({ survey ,msg: "Test Running.." }); 
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }


});

routerTest.post("/find", async function(req, res) {
    find(req,res);
});

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


