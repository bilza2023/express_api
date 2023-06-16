
const auth = require('../middleware/auth');
const express = require('express');

const getData = require('../common/getData');

const find = require('./find');
const run = require('./run');
const save = require('./save');
// const {Test,Survey} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerTest = express.Router();
routerTest.use(auth);
/////////////////////////////////////////////////
 
routerTest.post("/run", async function(req, res) {run(req, res);});

routerTest.post("/find", async function(req, res){find(req,res);});

routerTest.post("/save", async function(req, res) {
  try {
  debugger;
  const data = await getData(req,['test']);
  const test = await save(data.test);
    return  res.status(200).json({ test });

  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


