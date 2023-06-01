
//--Require
require('dotenv').config();
// const express = require('express');
// const auth = require('../middleware/auth');

const Survey = require("../models/survey");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
/////////////////////////////////////////////////
// const surveyRouter = express.Router();
// surveyRouter.use(auth);
/////////////////////////////////////////////////

async function clone(req, res) {
  try {
  // debugger;
    const id = req.body.id;
    const title = req.body.title;

    const originalQuiz = await Survey.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Survey not found" });
    }
    const survey = new Survey(originalQuiz.toObject());
    // userId is already set
    survey._id = undefined;
    survey.isNew = true;
    survey.title = title; //--new title
    survey.createdAt = Date.now();
    await survey.save();
    return res.status(200).json({ survey ,msg: "Cloned.." });
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}

module.exports = clone;