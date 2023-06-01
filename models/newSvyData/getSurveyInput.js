const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyInput',
    payload  :      ''
}

module.exports = baseInput;
