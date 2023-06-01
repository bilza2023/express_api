const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyPassword',
    payload  :      ''
}

module.exports = baseInput;
