const lorem = require('./lorem');
const uuid = require('./uuid');

const baseMCQ = {
    id : uuid(),
    required : true,
    content : lorem(5),
    explanation : lorem(5),
    multiSelect:true,
    selectedOptions :['xxx','xxx'],
    displayOptions : 'bars',
    backendType : 'SurveyMCQ',
    options :[
    {id : uuid() , content : lorem(3)},
    {id : uuid() , content : lorem(6)},
    {id : uuid() , content : lorem(8)}
    ]
}

module.exports = baseMCQ;