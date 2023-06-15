
const {Template} = require("../../models/survey/survey");

async function clone(id,title) {
  try {
    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      throw skillzaErrList.getErr("itemNotFound");
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
    throw error;
  }
}

module.exports = clone;