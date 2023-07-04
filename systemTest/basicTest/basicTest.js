const {TestData} = require('../TestData');
//--
const getNewTagData =  require('../../superRouters/tagFn/getTag.js');
const checkMax =  require('../../superRouters/checks/checkMax.js');
const SuperRouterOptions = require('../../superRouter/superRouterOptions.js');

//////////////////////////////////////////////////////////////
const create = require('../../superRouter/methods/create');
const del = require('../../superRouter/methods/delete');
const read = require('../../superRouter/methods/read');
const readone = require('../../superRouter/methods/readone'); 
const update = require('../../superRouter/methods/update');
//////////////////////////////////////////////////////////////
//--we are going to skip SuperRouter and thus skip req,res;
////////////////////////////////////////////////
const userIdVal='64202224fd8518cb214bd138';

 const opt = new SuperRouterOptions();
    opt.model = TestData;
    opt.debugMode = false; ///make it false after completion.
    opt.create.getNewObjDataFn = getNewTagData;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : 100       
    };

////////////////////////////////////////////////

async function basicTest( ){
    const userId='64202224fd8518cb214bd138';
    
    console.log('\x1b[33m%s\x1b[0m','Base Test');
    console.log('\x1b[33m%s\x1b[0m',"==========================");
    console.log('\x1b[34m%s\x1b[0m',"All 5 routes");
    //////////////////////////////////////////////////////////

    const itemCreated = await createTest({name: "Random Name" , description :'Random Description',userId},opt);
    //--update needs item
    await updateTest({item :itemCreated ,userId},opt);
    await readTest({userId},opt);
    await readoneTest({id :itemCreated._id,userId },opt);
    await deleteTest({id :itemCreated._id,userId  },opt);

   console.log('\x1b[36m%s\x1b[0m', 'Base Test Ended..===>>');
}

///////////////////////////////////////////////////

async function createTest(data,opt){
    try{
    //--we NEED userId
    const itemCreated = await create(data,opt);
    if (itemCreated){
        console.log('\x1b[32m%s\x1b[0m','create' , itemCreated._id);
    }else {
        console.error('failed to create');
    }
return itemCreated;    

    }catch(err){
    throw err;
    }
}
async function updateTest(data,opt){
try{
 const itemUpdated = await update({item: data.item },opt);
    if (itemUpdated){
        console.log('\x1b[32m%s\x1b[0m','update', itemUpdated._id);
    }else {
        console.error('failed to update');
    }
return itemUpdated;    
    }catch(err){
    throw err;
    }
}

async function readTest(data,opt){
try{
 const itemRead = await read({userId : data.userId },opt);
    if (itemRead){
        console.log('\x1b[32m%s\x1b[0m','read: length',itemRead.length);
    }else {
        console.error('failed to itemRead');
    }
return itemRead;    
}catch(err){
throw err;
}
}
async function readoneTest(data,opt){
try{
 const itemReadone = await readone(data,opt);
    if (itemReadone){
        console.log('\x1b[32m%s\x1b[0m','readone',itemReadone._id);
    }else {
        console.error('failed to itemReadone');
    }
return itemReadone;    
}catch(err){
throw err;
}
}
async function deleteTest(data,opt){
try{
const itemDeleted = await del({id :data.id,userId : data.userId},opt);
    
    if ( itemDeleted.deletedCount < 1 ){
        console.log('\x1b[31m%s\x1b[0m', 'failed to delete')
    }else {
        console.log('\x1b[35m%s\x1b[0m', 'item deleted',itemDeleted);
    }
return itemDeleted;    
}catch(err){
throw err;
}
}

////////////////////////////////
module.exports = basicTest


