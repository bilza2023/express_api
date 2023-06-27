/** 2023-6-28 
--Rules
all are post
all get "data" except for read --no future openings
merge superRouter and wrapper
*/
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const catchFn = require('./catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');
const getData = require('./getData');

//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getSuperRouter(opt){

    const superRouter = express.Router();
          superRouter.use(auth);
  // const mongoWrapper = new MongoWrapper(opt.model);
          superRouter.debugMode = true;
 //////////////////=======CREATE
 superRouter.post("/create", async function(req, res) {
  try{ 
        //  const data = getData(req);
        //  runChecks(checks,this.model,data,backendData);
        // //unique to create  
        // const newObjData = opt.data.create.getNewObjDataFn(data); 
        // let item = new this.model( newObjData );     
        // await item.save();
        return res.status(200).json({item:"Hello"});
        
  }catch (error) {
    catchFn(error,res,superRouter.debugMode);
  }
 });
 //////////////////=======UPDATE
 superRouter.post("/update", async function(req, res) {
  try{
  // debugger;
        //  'item', 
        return  await mongoWrapper.update(
        opt.data.update.checksArray, //--check functions
        opt.data.update.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 //--read is get since Get cant have data just token
 superRouter.get( "/read" , async function(req,res) {
 try{   
        const data = get
        return  await mongoWrapper.read(
        opt.data.read.data, //--array for getData from post.body
        opt.data.read.checksArray, //--check functions
        opt.data.read.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 //--readOne is post since it needs to send >>>"id"<<<<
 superRouter.post( "/readone" , async function(req,res) {
 try{   //debugger;

        return  await mongoWrapper.readOne(
        opt.data.readone.checksArray, //--check functions
        opt.data.readone.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 ////////////////////////////////////////////////////////
 //--readOne is post since it needs to send id
 superRouter.post( "/delete" , async function(req,res) {
 try{   //>>>>>>id<<<<<
        return  await mongoWrapper.delete(
        opt.data.delete.checksArray, //--check functions
        opt.data.delete.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 return superRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getBaseRouter;