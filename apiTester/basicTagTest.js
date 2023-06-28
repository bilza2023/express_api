const {Tag} = require('../models/tag');
const getTag =  require('../superRouters/tagFn/getTag');
const checkMax =  require('../superRouters/checks/checkMax');
const {MAX_TAGS_ALLOWED} = require('../common/appConfig');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const create = require('../superRouter/create');
const del = require('../superRouter/delete');
//we are going to skip SuperRouter and thus skip req,res;


///////////////////////////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Tag;
    opt.debugMode = false; ///make it false after completion.
    //..
    opt.create.getNewObjDataFn = getTag;
    //..
    opt.create.checks = [
        checkMax
    ];
    //..
    opt.create.backendData = {       
            checkMaxValue : MAX_TAGS_ALLOWED       
    };

////////////////////////////////////////////////
async function basicTagTest(data={name:'free-loading',description:'description' , userId : '64202224fd8518cb214bd138'}){
debugger;
    //--creation
    const itemCreated = await create(data,opt);
    if (itemCreated){
        console.log('item created');
    }else {
        console.log('failed to create');
    }
    // DELETE
    const itemDeleted = del() 

}


module.exports = basicTagTest


