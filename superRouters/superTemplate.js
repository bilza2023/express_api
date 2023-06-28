
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Survey} = require("../models/survey/survey");
const getNewObjDataFn =  require('./templateFn/getSurvey');

////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Survey;
    opt.create.getNewObjDataFn = getNewObjDataFn;
 
///////////////////////////////////////////
const superSurvey = getSuperRouter(opt);
module.exports = superSurvey;