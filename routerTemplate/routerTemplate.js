require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const deleteTemplate = require('./delete/deleteTemplate');
const clone = require('./clone/clone.js');
const save = require('./save/save.js');
const createNew = require("./createNew/createNew");
const getNewData = require("./createNew/getNewData");
//--The Template , Test and Survey (Running) are same Schemas.
const {Template} = require("../models/survey/survey");
    
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
/////////////////////////////////////////////////

routerTemplate.post("/clone", async function(req, res) {
  try {
   clone(req, res);
   }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});
 
routerTemplate.post("/new", async function(req, res) {
  try{
    debugger;
    const data = await getNewData(req,res);
    const template = await createNew(data.title,data.userId);  
    return res.status(200).json({template});

  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});


routerTemplate.post( "/delete" , async function(req,res) {
  try {
  deleteTemplate(req,res);
  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

routerTemplate.post("/save", async function(req, res) {
  try {
  save(req,res);
  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////


