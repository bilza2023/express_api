 
const getBaseRouter  = require('../baseRouter/BaseRouter');
const BaseRouterOptions = require('../baseRouter/baseRouterOptions');
const appConfig = require("../common/appConfig");
/////////////////////////
const {Template} = require("../models/survey/survey");
//.. change just this line.
const getNewObjDataFn =  require('./templateFn/getSurvey');

////////////////////////////////////////
//////-custome functionality --checks//
////////////////////////////////////////
const checkMax = require('./checks/checkMax');
////////////////////////////////////////

const opt = new BaseRouterOptions();
    opt.model = Template;
    opt.data.create.getNewObjDataFn = getNewObjDataFn;
    opt.data.create.getDataArray = ['title'];
    //---checks
    opt.data.create.checksArray = [
        checkMax
    ];
    opt.data.create.backendData = {       
            checkMaxValue : appConfig.MAX_TEMPLATE_ALLOWED       
        };
///////////////////////////////////////////
const superTemplate = getBaseRouter(opt);
module.exports = superTemplate;