
  const  getData = require('./getData');
  const  runChecks = require('./runChecks');

async function del(req, res,opt) {
  try{ 
        debugger;
         const data = getData(req);
         //---
         runChecks(
          opt.delete.checks,
          opt.model, 
          data,
          opt.delete.backendData);
        ///--must have data and must have id
        const delResult = await opt.model.deleteOne({ _id: data.id , userId :data.userId });

        return res.status(200).json({item:delResult});
        
  }catch (err) { throw err; }
}
module.exports = del;

