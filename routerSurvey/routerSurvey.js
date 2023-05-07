require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const createNew = require("./createNew");
const updateSurvey = require("./updateSurvey");
const clone = require("./clone");
const find = require("./find");
// const featuredQuiz = require("./featuredQuiz");
// const paginate = require("./paginate");
// const deleteQuiz = require("./deleteQuiz");

/////////////////////////////////////////////////
const surveyRouter = express.Router();
surveyRouter.use(auth);
/////////////////////////////////////////////////
 
surveyRouter.post("/new", async function(req, res) {
    await createNew(req,res);
});

surveyRouter.post("/update", async function(req, res) {
   await updateSurvey(req,res);
});

surveyRouter.post("/clone", async function(req, res) {
   clone(req, res);
});

surveyRouter.post( "/find" , async function(req,res) {
// debugger;
  find(req,res);
});


// surveyRouter.post( "/delete" , async function(req,res) {
// // debugger;
//   deleteQuiz(req,res);
// });

// surveyRouter.get( "/featured" , async function(req,res) {
//   featuredQuiz(req,res);
// });

// surveyRouter.get( "/page/:limit?/:count?" , async function(req,res) {
// // debugger;
//   const { limit = 20, count = 0 } = req.params;
//   // console.log("page");
//   paginate(req,res , limit , count);
// });





////////////////////////////////////////////////////////
module.exports = surveyRouter;
////////////////////////////////////////////////////////


