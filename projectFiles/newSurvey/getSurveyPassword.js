const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    questionType : 'SurveyPassword',
    payload  :      ''
}

module.exports = baseInput;
