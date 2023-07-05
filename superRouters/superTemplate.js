
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Template} = require("../models/models");
const getNewObjDataFn =  require('./templateFn/getSurvey');
const checkMax =  require('./checks/checkMax');
const {MAX_TEMPLATE_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Template;
    opt.create.getNewObjDataFn = getNewObjDataFn;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : MAX_TEMPLATE_ALLOWED       
        };
///////////////////////////////////////////
const superTemplate = getSuperRouter(opt);
module.exports = superTemplate;