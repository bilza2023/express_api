require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const deleteTemplate = require('./delete/deleteTemplate');
const clone = require('./clone/clone.js');
const save = require('./save/save.js');
const createNew = require("./createNew/createNew");
const getData = require('./getData');  
const find = require('./fn/find');  
const checkMaxTemplate = require('./fn/checkMaxTemplate');  
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
/////////////////////////////////////////////////

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
 
routerTemplate.post("/new", async function(req, res) {
  try{
  debugger;
    const data = await getData(req,['title']);
      await checkMaxTemplate(data.userId);
    const template = await createNew(data.title,data.userId);  

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

  }catch (skillzaaError) {
  // debugger;
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

routerTemplate.post("/save", async function(req, res) {
  try {
  const data = await getData(req,['survey']);
  const survey = await save(data.survey);
    return  res.status(200).json({ survey });

  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////


