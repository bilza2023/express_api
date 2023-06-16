in this route 
routerTemplate.post( "/delete" , async function(req,res) {
  try {
  debugger;
    const data = await getData(req,['quizId', "ii"]);
    await find(data.quizId);
    await deleteTemplate(data.userId,data.quizId);
      return res.status(200).json({template});

  }catch (skillzaaError) {
  debugger;
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

the getData function throw a corruptIncommingData error due to fake "ii" in the arguments.

const skillzaErrList = require('../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getData(req, fields) {
  try {
    const data = {};
    const userId  = req.user._id;
    if (userId == undefined){
        throw skillzaErrList.getErr("loginError");
    }else {
        data.userId = userId;
    }
    
    for (const field of fields) {
      data[field] = req.body[field];
    }
    if (Object.values(data).some(value => value === undefined)) {
      throw skillzaErrList.getErr("corruptIncommingData");
    }
    return data;
  } catch (error) {
    // throw skillzaErrList.getErr(error.name);
    throw error;
  }
}

module.exports = getData;

the last function in the route is deleteTemplate which return deleteError
require('dotenv').config();
const auth = require('../../middleware/auth');
const express = require('express');
const appConfig = require("../../common/appConfig");
const {Template} = require("../../models/survey/survey");


const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");

async function deleteTemplate (userId,quizId) {
  try {
    const r = await Template.deleteOne({ _id: quizId , userId });
    return  true;

  } catch(error) {
    throw skillzaErrList.getErr("deleteError");
  }
}


module.exports = deleteTemplate;


i should get the corruptIncommingData error but am getting deleteError

