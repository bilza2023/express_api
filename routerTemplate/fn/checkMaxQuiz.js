
const appConfig = require("../../common/appConfig");
const {Template} = require("../../models/survey/survey");
const respFail = require("../../common/respFail");


async function checkMaxQuiz(userId,res){
      
      const prev = await Template.count({userId :userId});
      
      if (prev > appConfig.MAX_QUIZ_ALLOWED ){
        return respFail(res,200,"maxQuizReached",
        `As per your account type no more than ${appConfig.MAX_QUIZ_ALLOWED} Temapltes are allowed`);
      }else {
        return true;
      }
 }

 module.exports = checkMaxQuiz;

 