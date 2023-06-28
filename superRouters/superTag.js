
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('./tagFn/getTag');

////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Tag;
    opt.create.getNewObjDataFn = getTag;
 
///////////////////////////////////////////
const superTag = getSuperRouter(opt);
module.exports = superTag;