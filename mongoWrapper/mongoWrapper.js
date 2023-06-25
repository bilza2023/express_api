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

  async create(req,res,newObjDataFunction,getDataArray=[],checks=[],backendData={}) {
    try{
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }

        //------Run ChecksEnd ----------------
        const newObjData = newObjDataFunction(data); //unique to create
        let item = new this.model( newObjData );     
        await item.save();
        return res.status(200).json({item});
    
    } catch (error) {
      // debugger;
        throw error;
    }
  }
///////////////////////////////////
  async readOne(req,res,getDataArray=[],checks=[],backendData={}) {
    try{ // there should be an "id" in the getDataArray
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
        //--should  i check for userId ???????????????????????
      const finalItem = await this.model.findById(data.id);
      
      if(!finalItem){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item:finalItem});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
///////////////////////////////////
//--read many 
///////////////////////////////////
  async read(req,res,getDataArray=[],checks=[],backendData={}) {
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
      const finalItems = await this.model.find({"userId" : data.userId})

      if(!finalItems){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({items:finalItems});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
///////////////////////////////////
///////////////////////////////////
  async update(req,res,updateItemName,getDataArray=[],checks=[],backendData={}) {
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
///////////////////////////////////
  async delete(req,res,getDataArray=[],checks=[],backendData={}) {
    try{ // there should be an "id" in the getDataArray
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
        //--should  i check if deleted ???????????????????????
      const delResult = await this.model.deleteOne({ _id: data.id , userId :data.userId });

      return res.status(200).json(delResult);
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }


} //class

module.exports = MongoWrapper;

/////////===checks
