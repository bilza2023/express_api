
const getBaseRouter  = require('./BaseRouter');
const BaseRouterOptions = require('./baseRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('../routers/tagFn/getTag');

////////////////////////////////////////
    // debugger;
const opt = new BaseRouterOptions();

    opt.model = Tag;
    opt.data.create.getNewObjDataFn = getTag;
    opt.data.create.getDataArray = ['name','description'];

 

///////////////////////////////////////////
const routerBaseTest = getBaseRouter(opt);
module.exports = routerBaseTest;