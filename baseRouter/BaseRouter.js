/** 2023-6-26 
* This is nothing more than a giant object feeding data to a Router, it has data for all the 5 methods of the router create,read,readone,update,delete.

* There are some variables like 'item' and 'id' we can push them into mongoWrapper. ???

*/
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const catchFn = require('./catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');

//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getBaseRouter(opt){

  const baseRouter = express.Router();
  baseRouter.use(auth);
  const mongoWrapper = new MongoWrapper(opt.model);
 //////////////////=======CREATE
 baseRouter.post("/create", async function(req, res) {
  try{ 
    // debugger;
        return  await mongoWrapper.create(
        //--The usual req and res
        req,res, 
        //--the data fn for new object newObjDataFunction notin other methods
        opt.data.create.getNewObjDataFn,
        //--array for getData from post.body 
        opt.data.create.getDataArray, 
        //--check functions
        opt.data.create.checksArray, 
        //--data that did not come from front-end
        opt.data.create.backendData);
  }catch (error) {
    catchFn(error,res);
  }
 });
 //////////////////=======UPDATE
 baseRouter.post("/update", async function(req, res) {
  try{
  // debugger;
        return  await mongoWrapper.update(
        req,res, //--The usual req and res
        //updateItemName : we can send many variable names in getDataArray but out of which needs to be written to db. 
         'item', 
         //--getDataArray:array for getData from post.body
        ['item'], //--specigfic to skillzaa api
        opt.data.update.checksArray, //--check functions
        opt.data.update.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 //--read is get since Get cant have data just token
 baseRouter.get( "/read" , async function(req,res) {
 try{   
    debugger;
        return  await mongoWrapper.read(
        req,res, //--The usual req and res
        opt.data.read.getDataArray, //--array for getData from post.body
        opt.data.read.checksArray, //--check functions
        opt.data.read.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 //--readOne is post since it needs to send id
 baseRouter.post( "/readone" , async function(req,res) {
 try{   //debugger;
        return  await mongoWrapper.readOne(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        opt.data.readone.checksArray, //--check functions
        opt.data.readone.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 ////////////////////////////////////////////////////////
 //--readOne is post since it needs to send id
 baseRouter.post( "/delete" , async function(req,res) {
 try{   //debugger;
        return  await mongoWrapper.delete(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        opt.data.delete.checksArray, //--check functions
        opt.data.delete.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 return baseRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getBaseRouter;