const uuid = require('./uuid');


const basePassword = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyPassword',
    payload  :      ''
}

module.exports = basePassword;
