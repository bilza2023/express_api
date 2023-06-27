
const getBaseRouter  = require('./BaseRouter');
const BaseRouterOptions = require('./superRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('../routers/tagFn/getTag');

////////////////////////////////////////
    // debugger;
const opt = new BaseRouterOptions();

    opt.model = Tag;

 

///////////////////////////////////////////
const routerBaseTest = getBaseRouter(opt);
module.exports = routerBaseTest;