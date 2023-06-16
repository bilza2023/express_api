const {Template} = require("../../models/survey/survey");
const ObjToSchema = require('../ObjToSchema');
const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');

async function save(incommingSurvey){
   try {
  //  debugger;
    //---------------------------------------
    const questions = incommingSurvey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        throw skillzaErrList.getErr("QuestionTypeModelError");
    }
      incommingSurvey.questions = newQuestions;

    //---------------------------------------
    const options = { new: true, upsert: true }; 
    const survey = await Template.findByIdAndUpdate( incommingSurvey._id , incommingSurvey,options);

    if(survey){
    //when status is 200 no need for any further message.
      
    }else {
      throw skillzaErrList.getErr("failedToUpdate");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = save;