
const auth = require('../middleware/auth');
const express = require('express');

const getData = require('../common/getData');

const find = require('./find');
const retRes = require('../common/skillzaaError/retRes');
const run = require('./run');
const save = require('./save');
const deleteFn = require('./deleteFn');
const checkForResponses = require('./fn/checkForResponses');
// const {Test,Survey} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerTest = express.Router();
routerTest.use(auth);
/////////////////////////////////////////////////
 
routerTest.post("/run", async function(req, res) {run(req, res);});

routerTest.post("/find", async function(req, res){find(req,res);});

routerTest.post("/save", async function(req, res) {
  try {
  // debugger;
  const data = await getData(req,['test']);
  const test = await save(data.test);
    return  res.status(200).json({ test });
 
    }catch (err) { return retRes(err,res); }
});
routerTest.post("/delete", async function(req, res) {
  try {
  debugger;
  const data = await getData(req,['id']);
      await checkForResponses(data.id,data.userId);
      await deleteFn(data.id,data.userId);
    return  res.status(200).json({  });
  }catch (err) { return retRes(err,res); }
});

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


