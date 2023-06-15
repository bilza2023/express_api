
const auth = require('../middleware/auth');
const express = require('express');

const find = require('./find');
const run = require('./run');
// const {Test,Survey} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerTest = express.Router();
routerTest.use(auth);
/////////////////////////////////////////////////
 
routerTest.post("/run", async function(req, res) {run(req, res);});

routerTest.post("/find", async function(req, res){find(req,res);});

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


