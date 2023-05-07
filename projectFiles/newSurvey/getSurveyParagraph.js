const uuid = require('../uuid');


const baseInput = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    backendType : 'SurveyParagraph',
    payload  :      ''
}

module.exports = baseInput;