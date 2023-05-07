const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    backendType : 'SurveyUrl',
    payload  :      ''
}

module.exports = baseInput;