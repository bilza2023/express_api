
    
const getBaseRouter  = require('../baseRouter/BaseRouter');
const BaseRouterOptions = require('../baseRouter/baseRouterOptions');
const {ClassObj} = require("../models/class");
//.. change just this line.
const getNewObjDataFn =  require('./classFn/getClass');

////////////////////////////////////////
    // debugger;
const opt = new BaseRouterOptions();
    opt.model = ClassObj;
    opt.data.create.getNewObjDataFn = getNewObjDataFn;
    opt.data.create.getDataArray = ['name','description'];

 

///////////////////////////////////////////
const superTag = getBaseRouter(opt);
module.exports = superTag;