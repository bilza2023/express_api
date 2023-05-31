const uuid = require('../uuid');


const baseParagraph = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    questionType : 'SurveyParagraph',
    payload  :      ''
}

module.exports = baseParagraph;
