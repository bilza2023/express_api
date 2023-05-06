const lorem = require('./lorem');
const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       lorem(12),
    explanation :   lorem(25),
    backendType : 'SurveyNumber',
    payload  :      0
}

module.exports = baseInput;