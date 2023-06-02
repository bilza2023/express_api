const uuid = require('./newSvyData/uuid');


    const correctId = uuid();
const qDataMCQ = {
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

const qDataEmail = {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyEmail',
    payload  :      ""
}

const qDataInput = {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyInput',
    payload  :      ''
}

const qDataNumber = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyNumber',
    payload  :      0
}

const qDataParagraph = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyParagraph',
    payload  :      ''
}

const qDataPassword = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyPassword',
    payload  :      ''
}

const qDataUrl = {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyUrl',
    payload  :      ''
}

function getSurvey(user_id, incomming_title = "New Test") {
   const svy = { 
        userId : user_id,
        title : incomming_title,
        saveResponse : false,
        showIntro : true,
        introText : "Welcome",
        published : false,
        showResult : true,
        showfarewellText : true,
        farewellText : "Goodbye",
        members : [],
        questions : []
   }
 return svy;   
}


module.exports = { qDataUrl,qDataPassword,qDataParagraph,qDataNumber,qDataInput,qDataEmail,qDataMCQ, getSurvey }
