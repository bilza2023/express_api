
const {getSurvey} = require('../../globals/questionTypesData');
const {Template} = require("../../models/survey/survey");

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
module.exports  = createNew;
