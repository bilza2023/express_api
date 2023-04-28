require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const createProject = require("./createProject");
const updateQuiz = require("./updateQuiz");
const cloneQuiz = require("./cloneQuiz");
const featuredQuiz = require("./featuredQuiz");
const paginate = require("./paginate");
const findQuiz = require("./findQuiz");
const deleteQuiz = require("./deleteQuiz");
// const deleteQuestion = require("./deleteQuestion");
const allQuestions = require("./allQuestions");
// const newQuestion = require("./newQuestion");

/////////////////////////////////////////////////
const quizRouter = express.Router();
quizRouter.use(auth);
/////////////////////////////////////////////////

quizRouter.post("/new", async function(req, res) {
// console.log("new")
   const r = await createProject(req,res);
});

quizRouter.post("/update", async function(req, res) {
  await updateQuiz(req,res);
});

quizRouter.post("/clone", async function(req, res) {
  cloneQuiz(req, res);
});

quizRouter.get( "/featured" , async function(req,res) {
  featuredQuiz(req,res);
});

quizRouter.get( "/page/:limit?/:count?" , async function(req,res) {
// debugger;
  const { limit = 20, count = 0 } = req.params;
  // console.log("page");
  paginate(req,res , limit , count);
});

quizRouter.post( "/find" , async function(req,res) {
  findQuiz(req,res);
});

quizRouter.post( "/delete" , async function(req,res) {
// debugger;
  deleteQuiz(req,res);
});

// quizRouter.post( "/question/delete" , async function(req,res) {
//   deleteQuestion(req,res);
// });

quizRouter.get('/all_questions', async (req, res) => {
  allQuestions(req, res);
});

// quizRouter.post('/question/new', async (req, res) => {
//   newQuestion(req, res);
// });

////////////////////////////////////////////////////////
module.exports = quizRouter;

////////////////////////////////////////////////////////


