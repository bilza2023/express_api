
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const quizRouter = express.Router();
const Quiz = require("../models/quiz");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////



////////////////////////////////////////////////////////
quizRouter.get("/" , async function(req,res) {
  try {

    const quizzzes = await Quiz.find({});
    return res.status(200).json({msg : "success" , quizzzes });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// quizRouter.get("/page/:limit?/:count?" , async function(req,res) {
//   try {
//     const { limit = 2, count = 0 } = req.params;

//     const subscribers = await Subscriber.find({}).limit(limit).skip(count);
//     return res.status(200).json({msg : "success" , subscribers });
//   } catch(error) {
//     return res.status(400).json({msg : "failure" , error  });
//   }
// });
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
quizRouter.get("/:id" , async function(req,res) {
  try {
    const id= req.params.id;
    const quiz = await Quiz.findById(id);
    return res.status(200).json({ quiz });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
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


