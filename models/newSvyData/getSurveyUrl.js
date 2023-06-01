const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyUrl',
    payload  :      ''
}

module.exports = baseInput;