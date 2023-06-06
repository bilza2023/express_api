require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const Survey = require("../models/survey");
const createNew = require("./createNew");

const updateSimple = require("./update/updateSimple");
const updatePublish = require("./update/updatePublish");

const clone = require("./clone");
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
 
surveyRouter.post("/new", async function(req, res) {
    await createNew(req,res);
});

surveyRouter.post("/update", async function(req, res) {
// debugger;
  await updateSimple(req,res);
});

surveyRouter.post("/publish", async function(req, res) {
// debugger;
   await updatePublish(req,res);
  //  await updateSurvey(req,res);
});

surveyRouter.post("/clone", async function(req, res) {
   clone(req, res);
});

surveyRouter.post( "/find" , async function(req,res) {
// debugger;
  find(req,res);
});


surveyRouter.post( "/delete" , async function(req,res) {
  deleteSurvey(req,res);
});

// surveyRouter.post( "/truncate" , async function(req,res) {
//   truncateSurvey(req,res);
// });
 

// surveyRouter.get( "/featured" , async function(req,res) {
//   featuredQuiz(req,res);
// });


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





////////////////////////////////////////////////////////
module.exports = surveyRouter;
////////////////////////////////////////////////////////


