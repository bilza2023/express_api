//--Require
require('dotenv').config();
   
const appConfig = require("../common/appConfig");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const Survey = require("../models/survey/survey");


async function createNew (req, res) {
   try {

   const title = req.body.title;
   const user= req.user;
   const userId  = user._id;
// debugger;
///////////////////---limit new quiz--////
if (userId !== process.env.OWNER_ID ){
const prev = await Survey.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
    }
}
//////--limit ends
   const newQuizObj = getSurvey(userId, title);
  
    let survey = new Survey( newQuizObj );
      
    await survey.save();
    const finalOkResp = await respOk(res,"new quiz created",{ survey });
    return finalOkResp;
  
  } catch (error) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}



function getSurvey(user_id, incomming_title) {
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

///////////////////////////////
module.exports  = createNew;
