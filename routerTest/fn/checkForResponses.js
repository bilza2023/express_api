const Result = require("../../models/result");

const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');


async function checkForResponses(id,userId){
   try {
    const count = await Result.countDocuments({ testId: id,userId });
      if(count != 0 ){
        throw skillzaErrList.getErr("testHasResponses");
      }else {
        return true;
      }
  } catch (error) {
    throw error;
  }
}



module.exports = checkForResponses;