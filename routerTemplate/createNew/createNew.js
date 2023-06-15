//--14-6-2023 : Code review. found correct use of respOk and respFail (you have to return it these fn do not return it for you). aapConfig is used instead of .env since it is easy to pass with code.
const {getSurvey} = require('../../globals/questionTypesData');
const {Template} = require("../../models/survey/survey");
const checkMaxQuiz = require('../fn/checkMaxQuiz');
const getNewData = require('./getNewData');
const checkMaxTemplate = require('../fn/checkMaxTemplate');

const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function createNew (title,userId) {
 try { 
  //--getSurvey is in globals 
    const newQuizObj = getSurvey(userId, title);
    let template = new Template( newQuizObj );     
    await template.save();
    return  template;
   
  } catch (error) {
    throw skillzaErrList.getErr('failedToCreateNew');
  }
}




///////////////////////////////
module.exports  = {createNew,getNewData,checkMaxTemplate};
