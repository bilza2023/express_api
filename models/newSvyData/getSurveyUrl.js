const uuid = require('./uuid');


const baseUrl = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyUrl',
    payload  :      ''
}

module.exports = baseUrl;