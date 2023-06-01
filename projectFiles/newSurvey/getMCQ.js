const uuid = require('../uuid');

const baseMCQ = {
    id : uuid(),
    required : false,
    content : "",
    explanation : "",
    multiSelect: false,
    selectedOptions :[],
    correctOptions :[],
    displayOptions : 'bars',
    questionType : 'SurveyMCQ',
    options :[
    {id : uuid() , content : ""},
    {id : uuid() , content : ""}
    ]
}

module.exports = baseMCQ;
