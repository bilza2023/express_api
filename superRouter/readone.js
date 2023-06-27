

async function readone(req, res) {
  try{ 
        //  const data = getData(req);
        //  runChecks(checks,this.model,data,backendData);
        // //unique to create  
        // const newObjData = opt.data.create.getNewObjDataFn(data); 
        // let item = new this.model( newObjData );     
        // await item.save();
        return res.status(200).json({item:"Hello from readone!"});
        
  }catch (error) {
    catchFn(error,res,superRouter.debugMode);
  }
}
module.exports = readone;