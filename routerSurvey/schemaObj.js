


const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require('../models/svyQuestion');

    const schemaMap = {
    "SurveyMCQ" : SurveyMCQ,
    "SurveyInput"   : SurveyInput,
    "SurveyParagraph"   : SurveyParagraph,
    "SurveyNumber"  : SurveyNumber,
    "SurveyUrl" : SurveyUrl,
    "SurveyPassword"    : SurveyPassword,
    "SurveyEmail"   : SurveyEmail
    };


 async function ObjToSchema(questions) {
  const newQuestions = [];

    debugger;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (!question._id) {
    //--great technique.
      const SchemaConstructor = schemaMap[question.backendType];
    //   const SchemaConstructor = schemaMap['SurveyMCQ'];
      const q = new SchemaConstructor(question);
      newQuestions.push(q);
    } else {
      newQuestions.push(question);
    }
  }
  return newQuestions;
}

module.exports = {ObjToSchema};