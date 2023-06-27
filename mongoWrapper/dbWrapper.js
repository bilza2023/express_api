/*
* 2023-6-26 : 
* dbWrapper Wraps the CRUD operations of mongoose and provide a consistent  REST API. 
* This is the REST Layer of Mongoose.
*/

require('dotenv').config();
const skillzaErrList = require('../skillzaaError/skillzaaErrList');
const runChecks = require('../superRouter/runChecks');
/////////////////////////////////////////////////
class MongoWrapper { 
  constructor(mdl) {
    this.model = mdl;
    this.debugMode = false;
    this.checks = {}; 
  }
///////////////////////////////////////////
  async create(newObjDataFunction,data=[],checks=[],backendData={}) {
    try{
        //------Run Checks ----------------
          runChecks(checks,this.model,data,backendData);
        const newObjData = newObjDataFunction(data); //unique to create
        let item = new this.model( newObjData );     
        await item.save();
        return item;
    } catch (error) {
        throw error;
    }
  }
///////////////////////////////////
  async readOne(data={}, checks=[],backendData={} ) {
    try{ // there should be an "id" in the getDataArray
    // debugger;
          runChecks(checks,this.model,data,backendData);
        
      const item = await this.model.findById(data.id);
      if(!item){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return item;
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
//--read many 
///////////////////////////////////
  async read(data={},checks=[],backendData={}) {
    try{ 
          runChecks(checks,this.model,data,backendData);
      
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
  async update(data={},checks=[],backendData={}) {
    try{
    //-- the item to be updated should be called "item"
          runChecks(checks,this.model,data,backendData);

      const options = { new: true, upsert: true }; 
      const finalItem = await this.model.findByIdAndUpdate( data.item._id , data.item,options);
      
      if(!finalItem){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
        return res.status(200).json({item:finalItem});
    } catch (error) {
        throw error;
    }
  }
///////////////////////////////////
  async delete(data={},checks=[],backendData={}) {
    try{ 
        // there should be an "id" in the getDataArray
          runChecks(checks,this.model,data,backendData);
        //--
      const delResult = await this.model.deleteOne({ _id: data.id , userId :data.userId });
          return res.status(200).json({item:delResult});
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
} //class

module.exports = MongoWrapper;
