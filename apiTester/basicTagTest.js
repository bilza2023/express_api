const {Tag} = require('../models/tag');
const getTag =  require('../superRouters/tagFn/getTag');
const checkMax =  require('../superRouters/checks/checkMax');
const {MAX_TAGS_ALLOWED} = require('../common/appConfig');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const create = require('../superRouter/create');
const del = require('../superRouter/delete');
const read = require('../superRouter/read');
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
    console.log('\x1b[33m%s\x1b[0m',"Base Test Tag Collection");
    console.log('\x1b[33m%s\x1b[0m',"=======================");
    console.log('\x1b[34m%s\x1b[0m',"No Checks all 5 routes");
    //--creation
    //--we NEED userId
    const itemCreated = await create(incommingData,opt);
    if (itemCreated){
        console.log('\x1b[32m%s\x1b[0m','item created' , itemCreated._id);
    }else {
        console.error('failed to create');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // update
    //--we dont need userId since onlt id is used
    itemCreated.name = 'cg13dcsgddfzzzz';
    const itemUpdated = await update({item: itemCreated },opt);
    if (itemUpdated){
        console.log('\x1b[32m%s\x1b[0m','item itemUpdated', itemUpdated._id,itemUpdated.name);
    }else {
        console.error('failed to update');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // readone
    //--we NEED userId
    const itemRead = await read({userId : '64202224fd8518cb214bd138' },opt);
    if (itemRead){
        console.log('\x1b[32m%s\x1b[0m','item itemRead length',itemRead.length);
    }else {
        console.error('failed to itemRead');
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // readone
    //--we dont need userId since onlt id is used
    const itemReadone = await readone({id :itemCreated._id },opt);
    if (itemReadone){
        console.log('\x1b[32m%s\x1b[0m', 'item readone', itemReadone._id)
    }else {
        console.error('failed to readone');
    }
    //////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // DELETE 
    //--we dont need userId since onlt id is used
    const itemDeleted = await del({id :itemCreated._id,userId : '64202224fd8518cb214bd138'  },opt);
    
    if ( itemDeleted.deletedCount < 1 ){
        console.log('\x1b[31m%s\x1b[0m', 'failed to delete')
    }else {
        console.log('\x1b[35m%s\x1b[0m', 'item deleted',itemDeleted);
    }

   console.log('\x1b[36m%s\x1b[0m', 'Tag Test Ended..===>>');
}


module.exports = basicTagTest


