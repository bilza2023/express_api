const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    backendType : 'SurveyNumber',
    payload  :      0
}

module.exports = baseInput;