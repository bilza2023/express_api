
  const  getData = require('./getData');
  const  runChecks = require('./runChecks');
//-- there should must be data.item
async function update(req, res,opt) {
  try{ 
        // debugger;
         const data = getData(req);
         //---
         runChecks(
          opt.update.checks,
          opt.model, 
          data,
          opt.update.backendData);
          // ------Core Activity ----------------
      const options = { new: true, upsert: true }; 
      const item = await opt.model.findByIdAndUpdate( data.item._id , data.item,options);
      
      if(!item){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item});
        
  }catch (err) { throw err; }
}
module.exports = update;