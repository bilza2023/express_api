const lorem = require('./lorem');
const uuid = require('./uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       lorem(12),
    explanation :   lorem(25),
    backendType : 'SurveyParagraph',
    payload  :      lorem(15)
}

module.exports = baseInput;