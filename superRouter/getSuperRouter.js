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
const getData = require('./getData');
const create = require('./create');
const read = require('./read');
const readone = require('./readone');
const update = require('./update');
const del = require('./delete');

//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getSuperRouter(opt){

 const superRouter = express.Router();
 //     superRouter.use(auth);
 superRouter.debugMode = true;
 //////////////////=======CREATE
 superRouter.get("/create",  async function(req, res) { 
      try{
      create(req, res,opt)
      }catch(err){
            catchFn(err,res,this.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======UPDATE
 superRouter.get("/update",  async function(req, res) { 
      try{
      update(req, res,opt)
      }catch(err){
            catchFn(err,res,this.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======DELETE
 superRouter.get("/delete",  async function(req, res) { 
      try{
      del(req, res,opt)
      }catch(err){
            catchFn(err,res,this.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======READ
 superRouter.get("/read",  async function(req, res) { 
      try{
      read(req, res,opt)
      }catch(err){
            catchFn(err,res,this.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======READONE
 superRouter.get("/readone",  async function(req, res) { 
      try{
      readone(req, res,opt)
      }catch(err){
            catchFn(err,res,this.debugMode);
      }
});
 ////////////////////////////////////////////////////////

 return superRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getSuperRouter;