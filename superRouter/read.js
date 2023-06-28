
const skillzaErrList = require('../skillzaaError/skillzaaErrList');
  // const  getData it has its own getData
  const  runChecks = require('./runChecks');
//-- there should must be data.item
async function read(req, res,opt) {
  try{ 
        // debugger;
         const data = getData(req);
        //  const data = {};
         //---
         runChecks(
          opt.read.checks,
          opt.model, 
          data,
          opt.read.backendData);
      
      const items = await opt.model.find({"userId" : data.userId})

      if(!items){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({items});
        
  }catch (err) { throw err; }
}
module.exports = read;

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

////////////////////////////////////////////
//--just use this to extract out data and user-id
 function getData(req) {
  try {
    // const data  =  req.body.data;
    const data  =  {}; // no data in read from fornt end
    
    
    //--user id
    const userId  = req.user._id;
    if (userId == undefined) {
        throw skillzaErrList.getErr("loginError");
    }else {
        data.userId = userId.toString();
    }
      return data;

  } catch (error) {
    //--if you get this error come to this place and no place else
    throw skillzaErrList.getErr("corruptIncommingData");
  }
}
