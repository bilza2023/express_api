const uuid = require('./uuid');


const baseEmail = {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyEmail',
    payload  :      ""
}

module.exports = baseEmail;
