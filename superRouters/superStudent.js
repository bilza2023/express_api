
    
const getBaseRouter  = require('../baseRouter/BaseRouter');
const BaseRouterOptions = require('../baseRouter/baseRouterOptions');
const student = require("../models/student");
//.. change just this line.
const getNewObjDataFn =  require('./studentFn/getStudent');

////////////////////////////////////////
    // debugger;
const opt = new BaseRouterOptions();
    opt.model = student;
    opt.data.create.getNewObjDataFn = getNewObjDataFn;
    opt.data.create.getDataArray = ['id','name'];
 
///////////////////////////////////////////
const superTag = getBaseRouter(opt);
module.exports = superTag;