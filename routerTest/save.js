
const {Test} = require("../models/survey/survey");

const skillzaErrList = require('../common/skillzaaError/skillzaaErrList');

async function save(incommingTest){
   try {
    const options = { new: true, upsert: true }; 
    const test = await Test.findByIdAndUpdate( incommingTest._id , incommingTest,options);
    if(!test){
      throw skillzaErrList.getErr("failedToUpdate");  
      }else {
      return test;
      }
      
  } catch (error) {
    throw error;
  }
}

module.exports = save;