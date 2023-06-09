require('dotenv').config();

const appConfig = require("../common/appConfig");

const {Template} = require("../models/survey/survey");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");


async function clone(req, res) {
  try {
  // debugger;
    const id = req.body.id;
    const userId = req.user._id;
    const title = req.body.title;

  ///////////////////---limit new quiz--////
  if (userId !== process.env.OWNER_ID ){
  const prev = await Template.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
    }
  }
  //////--limit ends

    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Survey not found" });
    }
    const templ = new Template(originalQuiz.toObject());
    // userId is already set
    templ._id = undefined;
    templ.published = false; //important
    templ.members = []; //important
    templ.isNew = true;
    templ.title = title; //--new title
    templ.createdAt = Date.now();
    await templ.save();
    return res.status(200).json({ survey:templ ,msg: "Cloned.." }); 
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}

module.exports = clone;