//--Require
require('dotenv').config();
const {getSurvey} = require('../globals/questionTypesData');
const appConfig = require("../common/appConfig");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const {Template} = require("../models/survey/survey");


async function createNew (req, res) {
   try {

   const title = req.body.title;
   const user= req.user;
   const userId  = user._id;
debugger;
///////////////////---limit new quiz--////
if (userId !== process.env.OWNER_ID ){
const prev = await Template.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
    }
}
//////--limit ends
   const newQuizObj = getSurvey(userId, title);
  
    let template = new Template( newQuizObj );
      
    await template.save();
    const finalOkResp = await respOk(res,"new quiz created",{ survey:template });
    return finalOkResp;
  
  } catch (error) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}




///////////////////////////////
module.exports  = createNew;
