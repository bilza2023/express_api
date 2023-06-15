
const {Template} = require("../../models/survey/survey");
const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");
const checkMaxQuiz = require('../fn/checkMaxQuiz'); 

async function clone(id,userId,title) {
  try {

    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      return respFail(res,404,"notFound",'Survey not found');
    }

    const templ = new Template(originalQuiz.toObject());
    templ._id = undefined;// userId is already set
    templ.published = false; //important
    templ.members = []; //important
    templ.isNew = true;
    templ.title = title; //--new title
    templ.createdAt = Date.now();

    await templ.save();
    return  templ;

  } catch (error) {
    return null;
  }
}

module.exports = clone;