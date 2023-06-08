require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const ObjToSchema = require('./ObjToSchema.js');
const {Template} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
/////////////////////////////////////////////////
 

routerTemplate.post("/save", async function(req, res) {

   try {
   debugger;
       const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        return res.status(500).json({ msg : "Failed Question Type Casting" });
    }
      incommingSurvey.questions = newQuestions;

    //---------------------------------------
    const options = { new: true, upsert: true }; 
    const survey = await Template.findByIdAndUpdate( incommingSurvey._id , incommingSurvey,options);

    if(survey){
      return res.status(200).json({ msg : "Survey Saved",survey });
    }else {
      return res.status(404).json({ msg : "Item not found" });
    }
  } catch (error) {
      return res.status(500).json({ msg : "failed to save" });
    // const r = await respFail(res,"failed to save","failedToSaveSurvey");
    return r;
  }

});

////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////


