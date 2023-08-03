
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Run} = require("../models/survey/survey");
const getNewObjDataFn =  require('./runFn/getSurvey');
const checkMax =  require('./checks/checkMax');
const {MAX_RUNS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Run;
    opt.create.getNewObjDataFn = getNewObjDataFn;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : MAX_RUNS_ALLOWED       
        };
///////////////////////////////////////////
const superSurvey = getSuperRouter(opt);
module.exports = superSurvey;