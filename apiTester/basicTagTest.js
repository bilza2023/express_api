const {Tag} = require('../models/tag');
const getTag =  require('../superRouters/tagFn/getTag');
const checkMax =  require('../superRouters/checks/checkMax');
const {MAX_TAGS_ALLOWED} = require('../common/appConfig');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const create = require('../superRouter/create');
const del = require('../superRouter/delete');
const {read} = require('../superRouter/read');
const readone = require('../superRouter/readone');
const update = require('../superRouter/update');

//--we are going to skip SuperRouter and thus skip req,res;

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
async function basicTagTest(incommingData={name:'free-loading',description:'description' , userId : '64202224fd8518cb214bd138'}){
debugger;
    //--creation
    //--we NEED userId
    const itemCreated = await create(incommingData,opt);
    if (itemCreated){
        console.log('item created' , itemCreated._id);
    }else {
        console.log('failed to create');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // update
    //--we dont need userId since onlt id is used
    itemCreated.name = 'cg13dcsgddfzzzz';
    const itemUpdated = await update({item: itemCreated },opt);
    if (itemUpdated){
        console.log('item itemUpdated', itemUpdated._id,itemUpdated.name);
    }else {
        console.log('failed to update');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // readone
    //--we NEED userId
    const itemRead = await read({userId : '64202224fd8518cb214bd138' },opt);
    if (itemRead){
        console.log('item itemRead length',itemRead.length);
    }else {
        console.log('failed to itemRead');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // readone
    //--we dont need userId since onlt id is used
    const itemReadone = await readone({id :itemCreated._id },opt);
    if (itemReadone){
        console.log('item readone', itemReadone._id);
    }else {
        console.log('failed to readone');
    }
    //////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // DELETE 
    //--we dont need userId since onlt id is used
    const itemDeleted = await del({id :itemCreated._id },opt);
    if (itemDeleted){
        console.log('item deleted',itemDeleted);
    }else {
        console.log('failed to delete');
    }
}


module.exports = basicTagTest


