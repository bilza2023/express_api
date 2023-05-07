const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    backendType : 'SurveyPassword',
    payload  :      ''
}

module.exports = baseInput;