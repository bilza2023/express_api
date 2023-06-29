require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const {ClassObj,Tag} = require('./models/models.js');

//----new obj data
const getNewClassData =  require('./superRouters/classFn/getClass');
const getNewTagData =  require('./superRouters/tagFn/getTag.js');

const checkMax =  require('./superRouters/checks/checkMax');
const config = require('./common/appConfig');
const basicTest = require('./apiTester/basicTest.js');
const SuperRouterOptions = require('./superRouter/superRouterOptions');
const userIdVal='64202224fd8518cb214bd138';
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log("api Tester===>>");
    async function runAll(){
        await tagFn();
        await classFn();
        process.exit(1);
    }

    runAll();
});


//////////////////////////////////////////////
async function classFn(){

    /////////////////====CLASS
    const opt = new SuperRouterOptions();
    opt.model = ClassObj;
    opt.debugMode = false; ///make it false after completion.
    opt.create.getNewObjDataFn = getNewClassData;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : 100       
    };
    await basicTest({userId : userIdVal , name: "Outside Class" , description : 'description' } , opt, 'CLASS');
    console.log("api Tester  Ended..===>>");
    }
//////////////////////////////////////////////
//////////////////////////////////////////////
async function tagFn(){

    /////////////////====CLASS
    const opt = new SuperRouterOptions();
    opt.model = Tag;
    opt.debugMode = false; ///make it false after completion.
    opt.create.getNewObjDataFn = getNewTagData;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : 100       
    };
    await basicTest({userId : userIdVal , name: "Outside Class" , description : 'description' } , opt, 'TAGS');
    console.log("api Tags Test  Ended..===>>");
    }
//////////////////////////////////////////////
