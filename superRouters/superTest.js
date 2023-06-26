 
const getBaseRouter  = require('../baseRouter/BaseRouter');
const BaseRouterOptions = require('../baseRouter/baseRouterOptions');
const appConfig = require("../common/appConfig");
/////////////////////////
const {Test} = require("../models/survey/survey");
//.. change just this line.
const getNewObjDataFn =  require('./testFn/getSurvey');

////////////////////////////////////////
//////-custome functionality --checks//
////////////////////////////////////////
const checkMax = require('./checks/checkMax');
////////////////////////////////////////

const opt = new BaseRouterOptions();
    opt.model = Test;
    opt.data.create.getNewObjDataFn = getNewObjDataFn;
    opt.data.create.getDataArray = ['title'];
    //---checks
    opt.data.create.checksArray = [
        checkMax
    ];
    opt.data.create.backendData = {       
            checkMaxValue : appConfig.MAX_TESTS_ALLOWED       
        };
///////////////////////////////////////////
const superTest = getBaseRouter(opt);
module.exports = superTest;