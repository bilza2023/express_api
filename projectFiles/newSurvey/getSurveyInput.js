const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       '',
    explanation :   '',
    questionType : 'SurveyInput',
    payload  :      ''
}

module.exports = baseInput;
