require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
// const {SkillzaaError} = require('../mongoWrapper/skillzaaError/SkillzaaErrors');
// const skillzaErrList = require('../mongoWrapper/skillzaaError/skillzaaErrList');
const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');
const deleteTemplate = require('./delete/deleteTemplate');
const clone = require('./clone/clone.js');

const MongoWrapper = require('../mongoWrapper/mongoWrapper');
const {Template} = require("../models/survey/survey");

const getSurvey = require('./getSurvey');  
const updateSurvey = require('./updateSurvey');  
const getData = require('../mongoWrapper/getData');  
const find = require('./fn/find');  
const checkMaxTemplate = require('./fn/checkMaxTemplate');  
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
const mongoWrapper = new MongoWrapper(Template);
/////////////////////////////////////////////////

routerTemplate.post("/new", async function(req, res) {
  try{ //debugger;
    const backendData = {checkMaxValue : appConfig.MAX_TEMPLATE_ALLOWED};

        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        getSurvey, //--the data fn for new object newObjDataFunction
        ['title'], //--array for getData from post.body
        [mongoWrapper.checks.checkMax], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

routerTemplate.post("/save", async function(req, res) {
  try{
  debugger;
    const backendData = {};

        return  await mongoWrapper.update(
        req,res, //--The usual req and res
        'survey',
        ['survey'], //--array for getData from post.body
        [updateSurvey], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

////////////////////////////////////////////////////////

routerTemplate.post("/clone", async function(req, res) {
  try{
  // debugger;
    const data = await getData(req,['id','title']);
      await checkMaxTemplate(data.userId);
      await find(data.id);
    const template = await clone(data.id,data.title);  

      return res.status(200).json({template});

  }catch (skillzaaError) {
  //--child fn return errors here we convert that to resonse
      return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

routerTemplate.post( "/delete" , async function(req,res) {
  try {
  debugger;
    const data = await getData(req,['quizId']);
    await find(data.quizId);
    await deleteTemplate(data.userId,data.quizId);
      return res.status(200).json({});

  }catch (error) {
      console.log("Non-SkillzaaError", error);
  }
});
////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////
