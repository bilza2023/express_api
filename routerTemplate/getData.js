
const skillzaErrList = require('../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getData(req, fields) {
  try {
    const data = {};
    const userId  = req.user._id;
    if (userId == undefined){
        throw skillzaErrList.getErr("loginError");
    }else {
        data.userId = userId;
    }
    
    for (const field of fields) {
      data[field] = req.body[field];
    }
    if (Object.values(data).some(value => value === undefined)) {
      throw skillzaErrList.getErr("corruptIncommingData");
    }
    return data;
  } catch (error) {
    // throw skillzaErrList.getErr(error.name);
    throw error;
  }
}

module.exports = getData;
