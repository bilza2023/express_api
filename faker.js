require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const faker = require("./emptyQs/emptyQs.js");
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Creating Questions... ===>>");

    async function run(){
        await faker();
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
