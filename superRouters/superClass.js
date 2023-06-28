
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const ClassObj = require("../models/class");
const getNewObjDataFn =  require('./classFn/getClass');

////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = ClassObj;
    opt.create.getNewObjDataFn = getNewObjDataFn;
 
///////////////////////////////////////////
const superClass = getSuperRouter(opt);
module.exports = superClass;