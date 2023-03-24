
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const quizRouter = express.Router();
const Quiz = require("../models/quiz");
const newQuiz = require('../models/new_quiz.js');
/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////---new----////////////////////////////
quizRouter.post("/new", async function(req, res) {
   try {
   const token = req.body.token;
   const title = req.body.title;
   newQuiz.userId = "641a0285c1e7d9a8adddfd4a"
   const aa = newQuiz;
   aa.title =  title;
    let quiz = new Quiz( aa );
    await quiz.save();
    return res.json({ quiz, status: "ok" });
  
  } catch (error) {
    return res.status(400).json({ msg: "failure to save quiz.", error });
  }
});

quizRouter.post("/update", async function(req, res) {
  try {
    const quiz = req.body.quiz; // the updated fields
    const id = quiz._id; // the updated fields
     const options = { new: true, upsert: true }; 
    const updatedQuiz = await Quiz.findByIdAndUpdate( id , quiz,options);
    // console.log(updatedQuiz);
    return res.status(200).json({ msg: "success", status:"ok" , updatedQuiz });
  } catch (error) {
    return res.status(400).json({ msg: "failure", status:"error",error });
  }
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
quizRouter.get("/page/:limit?/:count?" , async function(req,res) {
  try {
    const { limit = 10, count = 0 } = req.params;

      const quizzes = await Quiz.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({msg : "success" , quizzes });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
quizRouter.post("/find" , async function(req,res) {
  try {
    const id= req.body.quizId;
    const quiz = await Quiz.findById(id);
    return res.status(200).json({ quiz,status:"ok" });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
// ////////////////////////////////////////////////////////
quizRouter.get("/show/:quizId" , async function(req,res) {
  try {
  const quizId  = req.params.quizId;
  // console.log(quizId)
    const quiz = await Quiz.findById( quizId );
    return res.status(200).json({ quiz,status:"ok" });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
// quizRouter.delete("/:id" , async function(req,res) {
//   try {
//     const id= req.params.id;

//     await Subscriber.deleteOne({ _id: id });
//     return res.status(200).json({msg : "success" });
//   } catch(error) {
//     return res.status(400).json({msg : "failure" , error  });
//   }
// });
//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = quizRouter;


