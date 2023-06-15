//--14-6-2023 : Code review. found correct use of respOk and respFail (you have to return it these fn do not return it for you). aapConfig is used instead of .env since it is easy to pass with code.
const {getSurvey} = require('../../globals/questionTypesData');
const {Template} = require("../../models/survey/survey");
const checkMaxQuiz = require('../fn/checkMaxQuiz');
const getData = require('./getNewData');
////////////////////////////////////////////
async function createNew (title,userId) {
 try { 
  //limit new quiz
    const limitCheck  = await checkMaxQuiz(userId);  
    // debugger;
    if ( limitCheck !== true){return limitCheck;}
  
  //--getSurvey is in globals 
    const newQuizObj = getSurvey(userId, title);
    let template = new Template( newQuizObj );     
    await template.save();
    
    return  template;
   
  } catch (error) {
    return null;
  }
}




///////////////////////////////
module.exports  = createNew;
