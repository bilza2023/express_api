
const {Template} = require("../../models/survey/survey");
const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");
const checkMaxQuiz = require('../fn/checkMaxQuiz'); 

async function clone(req, res) {
  try {
  // debugger;
    const id = req.body.id;
    const userId = req.user._id;
    const title = req.body.title;

  //limit new quiz
    const limitCheck  = await checkMaxQuiz(userId);  
    debugger;
    if ( limitCheck !== true){return limitCheck;}

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
    return  respOk(res,"new quiz created",{survey:templ});

  } catch (error) {
    return respFail(res,500,"unknownError",'unknown error');
  }
}

module.exports = clone;