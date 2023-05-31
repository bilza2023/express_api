const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    questionType : 'SurveyUrl',
    payload  :      ''
}

module.exports = baseInput;