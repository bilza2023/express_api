
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Test} = require("../models/survey/survey");
const getNewObjDataFn =  require('./testFn/getSurvey');

////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Test;
    opt.create.getNewObjDataFn = getNewObjDataFn;
 
///////////////////////////////////////////
const superTest = getSuperRouter(opt);
module.exports = superTest;