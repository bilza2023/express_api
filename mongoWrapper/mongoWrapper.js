require('dotenv').config();
const getData = require('./getData');  
const checkMax = require('./checks/checkMax');
const skillzaErrList = require('./skillzaaError/skillzaaErrList');
const appConfig = require("../common/appConfig");
/////////////////////////////////////////////////
class MongoWrapper {
  constructor(mdl) {
    this.model = mdl;
    this.checks = {}; 
    this.checks.checkMax = checkMax;
    this.checkMaxValue = 10;
  }

  async create(req,res,newObjDataFunction,getDataArray=[],checks=[],backendData) {
    try{
    debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }

        //------Run ChecksEnd ----------------
        const newObjData = newObjDataFunction(data);
        let template = new this.model( newObjData );     
        await template.save();
        return res.status(200).json({template});
    
    } catch (error) {
        throw error;
    }
  }
///////////////////////////////////
  async update(req,res,updateItemName,getDataArray=[],checks=[],backendData) {
    try{
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
      const options = { new: true, upsert: true }; 
      const finalItem = await this.model.findByIdAndUpdate( data[updateItemName]._id , data[updateItemName],options);
      
      if(!finalItem){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item:finalItem});
  
    } catch (error) {
        throw error;
    }
  }
///////////////////////////////////

} //class

module.exports = MongoWrapper;

/////////===checks
