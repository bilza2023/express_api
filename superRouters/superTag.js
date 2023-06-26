
const getBaseRouter  = require('../baseRouter/BaseRouter');
const BaseRouterOptions = require('../baseRouter/baseRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('./tagFn/getTag');

////////////////////////////////////////
    // debugger;
const opt = new BaseRouterOptions();
    opt.model = Tag;
    opt.data.create.getNewObjDataFn = getTag;
    opt.data.create.getDataArray = ['name','description'];

 

///////////////////////////////////////////
const superTag = getBaseRouter(opt);
module.exports = superTag;