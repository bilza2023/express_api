
  const  getData = require('./getData');
  const  runChecks = require('./runChecks');

async function readone(req, res,opt) {
  try{ 
        debugger;
         const data = getData(req);
         //---
         runChecks(
          opt.readone.checks,
          opt.model, 
          data,
          opt.readone.backendData);
        ///--must have data and must have id
        const item = await opt.model.findById(data.id);
      
      if(!item){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item});
        
  }catch (err) { throw err; }
}
module.exports = readone;

