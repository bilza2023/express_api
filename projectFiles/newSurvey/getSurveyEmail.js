const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       '',
    explanation :   '',
    backendType : 'SurveyEmail',
    payload  :      ""
}

module.exports = baseInput;