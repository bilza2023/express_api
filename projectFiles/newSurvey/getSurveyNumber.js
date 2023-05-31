const uuid = require('../uuid');


const baseNumber = {
    id : uuid(),
    required : true,
    content :       '',
    explanation :   '',
    questionType : 'SurveyNumber',
    payload  :      0
}

module.exports = baseNumber;
