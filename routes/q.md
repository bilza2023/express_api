here is my node.js mongoose router code for saving SurveyResults into database

resultRouter.js

require('dotenv').config();
const auth = require('../middleware/auth');

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const appConfig = require("../common/appConfig");

const express = require('express');
const resultRouter = express.Router();
const SurveyResult = require("../models/result");
const Survey = require("../models/survey");


const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
resultRouter.use(auth);
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  debugger;
  const user= req.user;
  // const userId  = user._id;
 
  const quiz = req.body.quiz;
  const quizResult = req.body.quizResult;
 
//--total number of responses
// const totalRespCount = await SurveyResult.countDocuments({userId});
// // console.log("totalRespCount" , totalRespCount);
//  if (totalRespCount > appConfig.MAX_RESPONSES_ALLOWED ){
//     return respFail(res,`No more than ${appConfig.MAX_RESPONSES_ALLOWED} Responses are allowed to be saved`,"maxResponsesReached");
//     }
//////////////////////////

  //--do not store 2 responses
  // debugger;
  // if (quiz.quizType == "quiz" ){
  //     const quizId = newResult.quizId;
  //     const existingResult = await SurveyResult.findOne({ quizId:newResult.quizId , email:newResult.email });
  //     if (existingResult) {
  //         return respFail(res,`Result already exists for this member`,"resultAlreadyExists");
  //     }
  // }
    
    
    
      // newResult.userId = user._id;
      let result = new SurveyResult(quizResult);
      await result.save();
      res.status(200).json({ success: true, message: 'Result saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

resultRouter.post('/analytics', async (req, res) => {
try {
// const user= req.user;
    // const userId  = req.userId;
    const quizId = req.body.quizId;
    const quiz =  await Survey.findById(quizId);
    const results = await SurveyResult.find({ quizId });
    res.json({ results,quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({  msg: 'Server error' });
  }
});

resultRouter.post( "/del" , async function(req,res) {
  try {
  debugger;
    const resultId = req.body.resultId;
const user= req.user;
    const userId  = req.userId;

  if (userId == null) {
    return res.status(400).json({ msg: "please register or login" });
  }
//---check if quiz has responses

    const r = await SurveyResult.deleteOne({ _id: resultId });
    return res.status(200).json({ msg : "deleted" });
//----------------------------------
  } catch(error) {
    return res.status(400).json({msg : "failed to delete"  });
  }
});

resultRouter.post("/deleteAll", async function(req, res) {
  try {
  debugger;
    const quizId = req.body.quizId;
   const user= req.user;
    const userId  = user._id;
   
    if (userId == null) {
      return res.status(400).json({ msg: "please register or login" });
    }

    await SurveyResult.deleteMany({ quizId: quizId });
    return res.status(200).json({ msg: "deleted all results" });
  } catch (error) {
    return res.status(400).json({ msg: "failed to delete  results" });
  }
});
////////////////////////////////////////////////////////
module.exports = resultRouter;


here is the result model result.js

const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
 totalMarks: {
    type: Number,
    required: true,
    default : 10
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  payload: {
    type: String,
    required: false,
    default : ''
  },
  selectedOptions: {
    type: [String],
    required: false,
    default : []
  },
  questionType: {
    type: String,
    enum: [ 'SurveyMCQ' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
  }
});
 
//--This is schema for a base result for a survey
const resultSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  quizId: { 
    type: String,
    required: true
  },
  ip: { 
    type: String,
    required: false,
    default : ''
  },
  countryCode: { 
    type: String,
    required: false,
    default : ''
  },
  email: { 
    type: String,
    required: true,
  },
  userId: { 
    type: String,
    required: true
  },
  answers: {
  type: [answerSchema],
  required: true
  }
});




const SurveyResult  = mongoose.model('SurveyResult', resultSchema);







////////////////////////////////////////////
module.exports = {SurveyResult};


Here is the result object coming from front end ..
answers
:[
    {
        "id": "8005255c-fd18-4601-808d-f30796b72d94",
        "required": false,
        "totalMarks": 10,
        "payload": "",
        "selectedOptions": [
            "fc8594f6-d12d-4c0e-9a4f-4eba7c16e6de",
            "b41628b2-1fec-4914-9a6d-7d813b93eb0c"
        ]
    },
    {
        "id": "3decea5c-76d2-4341-b77f-197f419c557f",
        "questionType": "SurveyParagraph",
        "required": false,
        "totalMarks": 10,
        "payload": "SurveyResult",
        "selectedOptions": []
    },
    {
        "id": "e6b8a41f-63ed-493d-8b70-f6180778e7d9",
        "questionType": "SurveyNumber",
        "required": false,
        "totalMarks": 10,
        "payload": 9,
        "selectedOptions": []
    },
    {
        "id": "7020dea7-eafd-4081-af06-1247f4b1eeec",
        "questionType": "SurveyEmail",
        "required": false,
        "totalMarks": 10,
        "payload": "SurveyResult",
        "selectedOptions": []
    },
    {
        "id": "a3544fb7-6aa9-4960-acb8-ed8f1bc32b72",
        "questionType": "SurveyPassword",
        "required": false,
        "totalMarks": 10,
        "payload": "SurveyResult",
        "selectedOptions": []
    },
    {
        "id": "cc0744c2-d696-47d0-b396-b75cc00a01a0",
        "questionType": "SurveyUrl",
        "required": false,
        "totalMarks": 10,
        "payload": "",
        "selectedOptions": []
    },
    {
        "id": "3bca71cc-5dde-410f-b717-61ed37ffae53",
        "questionType": "SurveyInput",
        "required": false,
        "totalMarks": 10,
        "payload": "",
        "selectedOptions": []
    }
]
countryCode
: 
"PK"
email
: 
"aaa@msn.com"
ip
: 
"103.113.103.207"
quizId
: 
"64784f0081e7c8b4afe7a310"
userId
: 
"64202224fd8518cb214bd138"


Problem : on "save" route at this line
let result = new SurveyResult(quizResult);
i get error

"SurveyResult is not a constructor"
