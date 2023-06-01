const uuid = require('./uuid');
const correctId = uuid();
const baseMCQ = {
    id : uuid(),
    required : false,
    content : "Question Statement",
    explanation : "",
    multiSelect: false,
    selectedOptions :[],
    correctOptions :[correctId],
    displayOptions : 'bars',
    questionType : 'SurveyMCQ',
    options :[
    {id : correctId , content : "Option One"},
    {id : uuid() , content : "Option Two"}
    ]
}

module.exports = baseMCQ;
