require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const {Survey,Test,Template} = require("../models/survey/survey");


const save = require("./save");
// const updatePublish = require("./update/updatePublish");
 
// const clone = require("./clone");
const maketest = require("./maketest");
const find = require("./find");
const deleteSurvey = require('./deleteSurvey');
const truncateSurvey  = require('./truncateSurvey');
// const featuredQuiz = require("./featuredQuiz");
const paginate = require("./paginate");
// const deleteQuiz = require("./deleteQuiz");

/////////////////////////////////////////////////
const surveyRouter = express.Router();
surveyRouter.use(auth);
/////////////////////////////////////////////////
 
surveyRouter.post("/save", async function(req, res) {
// debugger;
  await save(req,res);
});

// surveyRouter.post("/publish", async function(req, res) {
// // debugger;
//    await updatePublish(req,res);
//   //  await updateSurvey(req,res);
// });


surveyRouter.post("/maketest", async function(req, res) {
   maketest(req, res);
});

surveyRouter.post( "/find" , async function(req,res) {
// debugger;
  find(req,res);
});


surveyRouter.post( "/delete" , async function(req,res) {
  deleteSurvey(req,res);
});



surveyRouter.get( "/page/:limit?/:count?" , async function(req,res) {
// debugger;
// try{
  const { limit = 20, count = 0 } = req.params;
  const user= req.user;
  const userId  = req.userId;

  // const surveys = await Survey.find({});
  const surveys = await Survey.find({"userId" : userId})

  return res.status(200).json({surveys});
  // console.log("page");
  // paginate(req,res , limit , count);\

  // } catch(error) {
  //   // return res.status(400).json({msg : "failure" , error  });
  //   const r = await respFail(res,"unknown error","unknownError");
  //   return r;
  // }
});
surveyRouter.get( "/pagetest/:limit?/:count?" , async function(req,res) {
// debugger;
// try{
  const { limit = 20, count = 0 } = req.params;
  const user= req.user;
  const userId  = req.userId;

  // const surveys = await Survey.find({});
  const surveys = await Test.find({"userId" : userId})

  return res.status(200).json({surveys});
  // console.log("page");
  // paginate(req,res , limit , count);\

  // } catch(error) {
  //   // return res.status(400).json({msg : "failure" , error  });
  //   const r = await respFail(res,"unknown error","unknownError");
  //   return r;
  // }
});
surveyRouter.get( "/pagetemplate/:limit?/:count?" , async function(req,res) {
// debugger;
// try{
  const { limit = 20, count = 0 } = req.params;
  const user= req.user;
  const userId  = req.userId;

  // const surveys = await Survey.find({});
  const surveys = await Template.find({"userId" : userId})

  return res.status(200).json({surveys});
  // console.log("page");
  // paginate(req,res , limit , count);\

  // } catch(error) {
  //   // return res.status(400).json({msg : "failure" , error  });
  //   const r = await respFail(res,"unknown error","unknownError");
  //   return r;
  // }
});





////////////////////////////////////////////////////////
module.exports = surveyRouter;
////////////////////////////////////////////////////////


