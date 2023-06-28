/** 2023-6-28 

*/
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const express = require('express');
//-methods
const create = require('./create');
const read = require('./read');
const readone = require('./readone');
const update = require('./update');
const del = require('./delete');
const  getData = require('./getData');
const catchFn = require('./catchFn');
//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getSuperRouter(opt){

 const superRouter = express.Router();
 superRouter.use(auth);

 superRouter.use(bodyParser.json()); // for parsing application/json
 superRouter.use(bodyParser.urlencoded({ extended: true })); // for parsing 
 //////////////////=======CREATE
 superRouter.post("/create",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await create(data,opt);
            if (!item){
                  throw new Error("");
            }else {
                  return res.status(200).json({item})
            }
      }catch(err){
            debugger;
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======DELETE
 superRouter.post("/delete",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await del(data,opt);
            if (!item){
                  throw new Error("failedToDelete");
            }else {
                   return res.status(200).json({item})
            }
      }catch(err){
            debugger;
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 
 //////////////////=======UPDATE
 superRouter.post("/update",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await update(data,opt);
            if (!item){
                  throw new Error("failedToUpdate");
            }else {
                   return res.status(200).json({item})
            }
      }catch(err){
            debugger;
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======UPDATE
 superRouter.post("/read",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const items = await read(data,opt);
            if (!items){
                  throw new Error("failedToRead");
            }else {
                   return res.status(200).json({items})
            }
      }catch(err){
            debugger;
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======UPDATE
 superRouter.post("/readone",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await readone(data,opt);
            if (!item){
                  throw new Error("failedToReadone");
            }else {
                   return res.status(200).json({item})
            }
      }catch(err){
            debugger;
            catchFn(err,res,opt.debugMode);
      }
});

 ////////////////////////////////////////////////////////
 return superRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getSuperRouter;