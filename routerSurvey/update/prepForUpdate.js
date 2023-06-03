require('dotenv').config();
const Survey = require("../../models/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../../models/svyQuestion.js");
const respOk = require("../../common/respOk.js");
const respFail = require("../../common/respFail.js");
const {ObjToSchema} = require('../schemaObj.js');

async function prepForUpdate(req, res){
    try{

    const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        return res.status(500).json({ msg : "Failed Question Type Casting" });
    }
      incommingSurvey.questions = newQuestions;
    return incommingSurvey;
    
    }catch(e){
    return  res.status(500).json({ msg : "Failed to prep for update" });
    }
}

module.exports = prepForUpdate;