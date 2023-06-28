
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const Student = require("../models/student");
const getNewObjDataFn =  require('./studentFn/getStudent');

////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Student;
    opt.create.getNewObjDataFn = getNewObjDataFn;
 
///////////////////////////////////////////
const superStudent = getSuperRouter(opt);
module.exports = superStudent;