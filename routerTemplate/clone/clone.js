
const {Template} = require("../../models/survey/survey");
const getCloneData = require("./getCloneData");
const checkMaxQuiz = require('../fn/checkMaxQuiz'); 

async function clone(id,userId,title) {
  try {
  // debugger;
  
  //limit new quiz
    const limitCheck  = await checkMaxQuiz(userId);  
    // debugger;
    if ( limitCheck !== true){return limitCheck;}

    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      return respFail(res,404,"notFound",'Survey not found');
    }

    const template = new Template(originalQuiz.toObject());
    template._id = undefined;// userId is already set
    template.published = false; //important
    template.members = []; //important
    template.isNew = true;
    template.title = title; //--new title
    template.createdAt = Date.now();

    await template.save();
    return  template;

  } catch (error) {
    return respFail(res,500,"unknownError",'unknown error');
  }
}

module.exports = clone;