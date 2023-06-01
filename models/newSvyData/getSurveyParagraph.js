const uuid = require('./uuid');


const baseParagraph = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyParagraph',
    payload  :      ''
}

module.exports = baseParagraph;
