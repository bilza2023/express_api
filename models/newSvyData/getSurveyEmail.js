const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyEmail',
    payload  :      ""
}

module.exports = baseInput;
