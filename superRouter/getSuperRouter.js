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

const catchFn = require('./catchFn');
//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getSuperRouter(opt){

 const superRouter = express.Router();
 superRouter.use(auth);

 superRouter.use(bodyParser.json()); // for parsing application/json
 superRouter.use(bodyParser.urlencoded({ extended: true })); // for parsing 
 superRouter.debugMode = true;
 //////////////////=======CREATE
 superRouter.post("/create",  async function(req, res) { 
      try{
      create(req, res,opt)
      }catch(err){
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======UPDATE
 superRouter.post("/update",  async function(req, res) { 
      try{
      //debugger;
      update(req, res,opt)
      }catch(err){
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======DELETE
 superRouter.post("/delete",  async function(req, res) { 
      try{
      del(req, res,opt)
      }catch(err){
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======READ
 superRouter.post("/read",  async function(req, res) { 
      try{ 
      //debugger;
      read(req, res,opt)
      }catch(err){
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////
 //////////////////=======READONE
 superRouter.post("/readone",  async function(req, res) { 
      try{
      readone(req, res,opt)
      }catch(err){
            catchFn(err,res,opt.debugMode);
      }
});
 ////////////////////////////////////////////////////////

 return superRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getSuperRouter;