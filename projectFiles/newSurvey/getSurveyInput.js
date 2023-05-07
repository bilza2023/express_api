const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : false,
    content :       '',
    explanation :   '',
    backendType : 'SurveyInput',
    payload  :      ''
}

module.exports = baseInput;