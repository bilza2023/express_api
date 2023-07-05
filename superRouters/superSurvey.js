
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Survey} = require("../models/models");
const getNewObjDataFn =  require('./surveyFn/getSurvey');
const checkMax =  require('./checks/checkMax');
const {MAX_RUNS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Survey;
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