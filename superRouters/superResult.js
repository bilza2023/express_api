

    const getSuperRouter  = require('../superRouter/getSuperRouter');
    const SuperRouterOptions = require('../superRouter/superRouterOptions');
    const Result = require("../models/result");
    const getResult =  require('./resultFn/getResult');
    const checkMax =  require('./checks/checkMax');
    const {MAX_RESPONSES_ALLOWED} = require('../common/appConfig');

///////////////////////////////////////////////////////
 
    const opt = new SuperRouterOptions();
    opt.useAuth = false;

    opt.model = Result;
    opt.create.getNewObjDataFn = getResult;
    opt.create.checks = [
        checkMax
    ];

    opt.create.backendData = {       
            checkMaxValue : MAX_RESPONSES_ALLOWED       
        };
///////////////////////////////////////////
const superResult = getSuperRouter(opt);
module.exports = superResult;
