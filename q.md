may be you have not looked into MongoWrapper since you have made me a BaseRouter using a normal mongoose Model and not MonoWrapper. Please see in detail the code of MongoWrapper and then see how I have used it in routerTemplate.js. I want a baseRouter like routerTemplate.js

MongoWrapper.js
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
    debugger;
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
      await this.model.deleteOne({ _id: data.id , userId :data.userId });
      return res.status(200).json({success:true});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }


} //class

module.exports = MongoWrapper;

/////////===checks

getData.js

const skillzaErrList = require('./skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getData(req, fields) {
  try {
    const data = {};
    const userId  = req.user._id;
    if (userId == undefined){
        throw skillzaErrList.getErr("loginError");
    }else {
        data.userId = userId.toString();
    }
    
    for (const field of fields) {
      data[field] = req.body[field];
    }
    if (Object.values(data).some(value => value === undefined)) {
      throw skillzaErrList.getErr("corruptIncommingData");
    }
    return data;
  } catch (error) {
    // throw skillzaErrList.getErr(error.name);
    throw error;
  }
}

module.exports = getData;
checkMax.js

const skillzaErrList = require('../skillzaaError/skillzaaErrList');

/////////////////////////////////////////////////////////
async function checkMax(mdl,data,backendData){
    try{    
    debugger; 
      const prev = await mdl.count({userId :data.userId});
      if (prev > backendData.checkMaxValue ){
         const Err = skillzaErrList.getErr("maxItemLimitExceeded");
        throw Err;
      }else {
        return true;
      }

    }catch(error){
        throw error;
    }
}

module.exports = checkMax;


NOW HERE IS routerTemplate.js which uses the MonoWrapper and I want to make a BaseRouter like this

routerTemplate.js
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');
const clone = require('./clone/clone.js');

const MongoWrapper = require('../mongoWrapper/mongoWrapper');
const {Template} = require("../models/survey/survey");
/////////////////////////////////////////////////////////////
const getSurvey = require('./getSurvey');  
const updateSurvey = require('./updateSurvey');  
const getData = require('../mongoWrapper/getData');  
const find = require('./fn/find');  
const checkMaxTemplate = require('./fn/checkMaxTemplate');  
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
const mongoWrapper = new MongoWrapper(Template);
/////////////////////////////////////////////////

routerTemplate.post("/create", async function(req, res) {
  try{ //debugger;
    const backendData = {checkMaxValue : appConfig.MAX_TEMPLATE_ALLOWED};

        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        getSurvey, //--the data fn for new object newObjDataFunction
        ['title'], //--array for getData from post.body
        [mongoWrapper.checks.checkMax], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

routerTemplate.post("/update", async function(req, res) {
  try{
  // debugger;
    const backendData = {};

        return  await mongoWrapper.update(
        req,res, //--The usual req and res
        'survey',
        ['survey'], //--array for getData from post.body
        [updateSurvey], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
//--read is get since Get cant have data just token
routerTemplate.get( "/read" , async function(req,res) {
 try{   //debugger;
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
routerTemplate.post( "/readOne" , async function(req,res) {
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
routerTemplate.post( "/delete" , async function(req,res) {
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
routerTemplate.post("/clone", async function(req, res) {
  try{
  // debugger;
    const data = await getData(req,['id','title']);
      await checkMaxTemplate(data.userId);
      await find(data.id);
    const template = await clone(data.id,data.title);  

      return res.status(200).json({template});

  }catch (skillzaaError) {
  //--child fn return errors here we convert that to resonse
      return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////
