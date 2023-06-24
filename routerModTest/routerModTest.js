require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');

const MongoWrapper = require('../mongoWrapper/mongoWrapper');
const {Test} = require("../models/survey/survey");

/////////////////////////////////////////////////
const routerModTest = express.Router();
routerModTest.use(auth);
const mongoWrapper = new MongoWrapper(Test);
/////////////////////////////////////////////////
routerModTest.post("/save", async function(req, res) {
  try{
  debugger;
    const backendData = {};
        return  await mongoWrapper.update(
        req,res, //--The usual req and res
        'test', // this item in post.body is written to db
        ['test'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

////////////////////////////////////////////////////////
module.exports = routerModTest;
////////////////////////////////////////////////////////
