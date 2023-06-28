
  const  getData = require('./getData');
  const  runChecks = require('./runChecks');

async function create(req, res,opt) {
  try{ 
        debugger;
         const data = getData(req);
         //---
         runChecks(
          opt.create.checks,
          opt.model, 
          data,
          opt.create.backendData);
        //unique to create  
        const newObjData = opt.create.getNewObjDataFn(data); 
        let item = opt.model( newObjData );     
        await item.save();
        return res.status(200).json({item});
        
  }catch (err) { throw err; }
}
module.exports = create;