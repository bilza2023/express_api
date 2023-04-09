
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const resultRouter = express.Router();
const Result = require("../models/result");

/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
  try {
  debugger;
  const newResult = req.body.result;
   const { quizId, email } = newResult;
    const existingResult = await Result.findOne({ quizId, email });
    if (existingResult) {
      res.status(400).json({ success: false, message: 'Result already exists' });
    } else {
      let result = new Result(newResult);
      await result.save();
      res.json({ success: true, message: 'Result saved successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});
resultRouter.post('/analytics', async (req, res) => {
try {
    const quizId = req.body.quizId;
    const results = await Result.find({ quizId });
    res.json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

////////////////////////////////////////////////////////
module.exports = resultRouter;


