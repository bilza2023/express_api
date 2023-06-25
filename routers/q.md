here is my node-express app routerClass which uses mongoWrapper for CRUD operations
Here is routerClass
/**
2023-6-26

 */
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');
//////////----Mongoose Model Object----//////////////////
const ClassObj = require("../models/class");
const getClass =  require('./classFn/getClass');
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
const routerClass = express.Router();
routerClass.use(auth);
const mongoWrapper = new MongoWrapper(ClassObj);
/////////////////////////////////////////////////

routerClass.post("/create", async function(req, res) {
  try{ 
  
    const backendData = {checkMaxValue : appConfig.MAX_CLASSES_ALLOWED};

        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        getClass, //--the data fn for new object newObjDataFunction
        ['name','description'], //--array for getData from post.body
        [mongoWrapper.checks.checkMax], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    catchFn(error,res);
  }
});

routerClass.post("/update", async function(req, res) {
  try{
  debugger;
    const backendData = {};

        return  await mongoWrapper.update(
        req,res, //--The usual req and res
         'item',
        ['item'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
//--read is get since Get cant have data just token
routerClass.get( "/read" , async function(req,res) {
 try{   
    debugger;
    const backendData = {};

        return  await mongoWrapper.read(
        req,res, //--The usual req and res
        [ ], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

//--readOne is post since it needs to send id
routerClass.post( "/readone" , async function(req,res) {
 try{   //debugger;
    const backendData = {};
        return  await mongoWrapper.readOne(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
////////////////////////////////////////////////////////
//--readOne is post since it needs to send id
routerClass.post( "/delete" , async function(req,res) {
 try{   //debugger;
    const backendData = {};
        return  await mongoWrapper.delete(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
module.exports = routerClass;
////////////////////////////////////////////////////////
here is getClass.js


function getClass(data){
     const cls = { 
        userId : data.userId,
        name : data.name,
        description : data.description || ""
   }
 return cls;   

}

module.export = getClass;


and here is mongoWrapper.js
/*
* 2023-6-26 : There is error in delete, it does not send back delResult.
*
*/
require('dotenv').config();
const getData = require('./getData');  
const checkMax = require('./checks/checkMax');
const skillzaErrList = require('./skillzaaError/skillzaaErrList');
/////////////////////////////////////////////////
class MongoWrapper {
  constructor(mdl) {
    this.model = mdl;
    this.checks = {}; 
    this.checks.checkMax = checkMax;
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
        // debugger;
      const delResult = await this.model.deleteOne({ _id: data.id , userId :data.userId });

      return res.status(200).json({item:delResult});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
} //class

module.exports = MongoWrapper;

/////////===checks

The problem is that in mongoWrapper.create the "newObjDataFunction" gives error "newObjDataFunction is not a function" where as i have sent the getClass as third argument. why cant it find this function