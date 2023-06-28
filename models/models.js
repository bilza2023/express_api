
const {Survey , Template , Test}  = require('./survey/survey');
const { Member}  = require('./survey/member');
const  ClassObj  = require('./class');
const  Result  = require('./result');
const  Student  = require('./student');
const {Tag}  = require('./tag');
const {svyQuestionSchema,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmai}  = require('./survey/svyQuestion');




module.exports = {
Survey , Template , Test,
 Member,
ClassObj,
Result,
Student,
Tag


};