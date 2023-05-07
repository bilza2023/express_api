const uuid = require('../uuid');

const baseMCQ = {
    id : uuid(),
    required : false,
    content : "",
    explanation : "",
    multiSelect:true,
    selectedOptions :[],
    displayOptions : 'bars',
    backendType : 'SurveyMCQ',
    options :[
    {id : uuid() , content : ""},
    {id : uuid() , content : ""}
    ]
}

module.exports = baseMCQ;