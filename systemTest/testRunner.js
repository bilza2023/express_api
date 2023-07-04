require('dotenv').config();
///////////////////////////////////////////////////
const basicTest = require('./basicTest/basicTest.js');
///////////////////////////////////////////////

async function runTests(){
    
console.log("System  Test  Begin..===>>");

     await basicTest();

console.log("System Test  Endes..===>>");
} 

//////////////////////////////////////////////

module.exports = runTests;
