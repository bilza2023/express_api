const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");
const {Template} = require("../../models/survey/survey");
const ObjToSchema = require('../ObjToSchema');
async function save(req,res){
   try {
   debugger;
    const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        return respFail(res,500,"QuestionTypeCastingError",'Failed Question Type Casting');  
    }
      incommingSurvey.questions = newQuestions;

    //---------------------------------------
    const options = { new: true, upsert: true }; 
    const survey = await Template.findByIdAndUpdate( incommingSurvey._id , incommingSurvey,options);

    if(survey){
      return  respOk(res,"Survey Saved",{ survey });
    }else {
      return respFail(res,404,"NotFound",'Item not found');  
    }
  } catch (error) {
    return respFail(res,500,"unknownError",'unknown error');
  }
}

module.exports = save;