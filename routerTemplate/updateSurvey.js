const ObjToSchema = require('./ObjToSchema');

async function updateSurvey(mdl , data){
const questions = data.survey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        throw skillzaErrList.getErr("QuestionTypeModelError");
    }
      data.survey.questions = newQuestions;
}

module.exports = updateSurvey;