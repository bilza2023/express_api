//--14-6-2023 : Code review. found correct use of respOk and respFail (you have to return it these fn do not return it for you). aapConfig is used instead of .env since it is easy to pass with code.

const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getNewData (req,res) {
 try {
   const title = req.body.title;//error
   const userId  = req.user._id;
  //  debugger;
   if (title === undefined || userId === undefined){throw new Error("ok");}
    return {title,userId};

  } catch (error) {
    throw skillzaErrList.getErr("corruptIncommingData");
  }
}




///////////////////////////////
module.exports  = getNewData;
