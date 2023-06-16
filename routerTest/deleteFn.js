const {Test} = require("../models/survey/survey");

async function deleteFn(id,userId){
  try {
    const r = await Test.deleteOne({ _id: id , userId });
    return  true;

  } catch(error) {
    throw skillzaErrList.getErr("deleteError");
  }
}

module.exports = deleteFn;