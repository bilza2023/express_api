const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       '',
    explanation :   '',
    questionType : 'SurveyEmail',
    payload  :      ""
}

module.exports = baseInput;
