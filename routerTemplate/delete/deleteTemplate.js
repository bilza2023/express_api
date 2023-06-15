require('dotenv').config();
const auth = require('../../middleware/auth');
const express = require('express');
const appConfig = require("../../common/appConfig");
const {Template} = require("../../models/survey/survey");


const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");

async function deleteTemplate (req,res) {
  try {
  // debugger;
    // const user= req.user;
    const userId  = req.user._id;
    const quizId= req.body.quizId;//check
    const r = await Template.deleteOne({ _id: quizId , userId });
    return  respOk(res,"Template Deleted");

  } catch(error) {
    return respFail(res,500,"unknownError",'unknown error');
  }
}


module.exports = deleteTemplate;
