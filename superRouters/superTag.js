
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('./tagFn/getTag');
const checkMax =  require('./checks/checkMax');
const {MAX_TAGS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Tag;
    opt.debugMode = true; ///make it false after completion.
    opt.create.getNewObjDataFn = getTag;
    opt.create.checks = [
        checkMax
    ];
    ;
    opt.create.backendData = {       
            checkMaxValue : MAX_TAGS_ALLOWED       
        };
///////////////////////////////////////////
const superTag = getSuperRouter(opt);
module.exports = superTag;
//----a demo check function
// async function checkFunction(model, data, backendData) {
//   try {
//     const random = Math.random();
//     // if (random < 0.5) {
//     if (true) {
//       throw new Error('Check failed=====>');
//     }
//     // Other check logic
//   } catch (err) {
//   debugger;
//     // Custom error handling or logging
//     console.error('Error in checkFunction:', err);
//     // Optionally, rethrow the error to propagate it up
//     throw err;
//   }
// }