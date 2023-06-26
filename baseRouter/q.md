am getting this error

Mon, 26 Jun 2023 11:13:46 GMT uncaughtException: Router.use() requires a middleware function but got a Promise
TypeError: Router.use() requires a middleware function but got a Promise
    at Function.use (C:\expressApi\node_modules\express\lib\router\index.js:469:13)     
    at Function.<anonymous> (C:\expressApi\node_modules\express\lib\application.js:227:21)
    at Array.forEach (<anonymous>)
    at Function.use (C:\expressApi\node_modules\express\lib\application.js:224:7)       
    at Object.<anonymous> (C:\expressApi\index.js:48:5)
    at Module._compile (node:internal/modules/cjs/loader:1226:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1280:10)
    at Module.load (node:internal/modules/cjs/loader:1089:32)
    at Module._load (node:internal/modules/cjs/loader:930:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
[nodemon] app crashed - waiting for file changes before starting...

here is my index.js
require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
const express  =require('express');
const cors = require('cors');
const db = require("./mongoDb/mongo.js");
////////////////////////////////////////////////
//--Routers user , quiz , survey , result, nonAuth ,test 
const userRouter = require('./routes/userRouter');
// const quizRouter = require('./quizRouter/quizRouter');
// const routerSurvey = require('./routerSurvey/routerSurvey.js');
const routerTemplate = require('./routers/routerTemplate.js');
const routerTag = require('./baseRouter/TestBaseRouter.js');
const routerClass = require('./routers/routerClass.js');
const routerStudent = require('./routers/routerStudent.js');
// const routerTest = require('./routers/routerTest.js');
// const routerTest = require('./routers/routerTest.js');
// const resultRouter = require('./routes/resultRouter');
const nonAuthRouter = require('./routes/nonAuthRouter.js');

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;

////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(cookieParser());
//.. static files
// app.use(express.static(path.join(__dirname,"build")));
//..
app.use(express.json());
app.use(cors( )); //working
// app.use(cors({origin: "http://localhost/"}));
// app.use(cors({ origin: '*' })); //working
// app.use(cors({origin: process.env.HOME_URL})); //use this
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",nonAuthRouter);
app.use("/user",userRouter);
// app.use("/result",resultRouter);
// app.use("/survey",routerSurvey);
app.use("/template",routerTemplate);
app.use("/tag",routerTag);
app.use("/class",routerClass);
app.use("/student",routerStudent);
// app.use("/test",routerTest);

///////////////////////////Routes////////////////////////
app.post('/', async (req, res) =>{
// const ret = Survey.findById()
res.status(500).json({success :false ,  message : "Failed"});
// res.status(200).json({success :true ,  message : "Welcome to skillza api"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////

Am testing the tag router.

here is how i created it as TestBaseRouter.js

const getBaseRouter  = require('./BaseRouter');
const BaseRouterOptions = require('./baseRouterOptions');
const {Tag} = require("../models/tag");
const getTag =  require('../routers/tagFn/getTag');

////////////////////////////////////////
const opt = new BaseRouterOptions();

    opt.model = Tag;
    opt.data.create.getNewObjDataFn = getTag;
    opt.data.create.getDataArray = ['name','description'];



///////////////////////////////////////////
const routerBaseTest = getBaseRouter(opt);
module.exports = routerBaseTest;

here is BaseRouter.js
/** 2023-6-26 */
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const catchFn = require('./catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');

//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

async function getBaseRouter(opt){

  const baseRouter = express.Router();
  // baseRouter.use(auth);
  const mongoWrapper = new MongoWrapper(opt.model);
 //////////////////=======CREATE
 baseRouter.post("/create", async function(req, res) {
  try{ 
        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        opt.create.getNewObjDataFn, //--the data fn for new object newObjDataFunction
        opt.data.create.getDataArray, //--array for getData from post.body
        opt.data.create.checksArray, //--check functions
        opt.data.create.backendData);//--data that did not come from front-end
  }catch (error) {
    catchFn(error,res);
  }
 });
 //////////////////=======UPDATE
 baseRouter.post("/update", async function(req, res) {
  try{
  // debugger;
        return  await mongoWrapper.update(
        req,res, //--The usual req and res
         'item',
        ['item'], //--array for getData from post.body
        opt.data.update.checksArray, //--check functions
        opt.data.update.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 //--read is get since Get cant have data just token
 baseRouter.get( "/read" , async function(req,res) {
 try{   
    debugger;
        return  await mongoWrapper.read(
        req,res, //--The usual req and res
        [ ], //--array for getData from post.body
        opt.data.read.checksArray, //--check functions
        opt.data.read.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 //--readOne is post since it needs to send id
 baseRouter.post( "/readone" , async function(req,res) {
 try{   //debugger;
        return  await mongoWrapper.readOne(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        opt.data.readone.checksArray, //--check functions
        opt.data.readone.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });
 ////////////////////////////////////////////////////////
 //--readOne is post since it needs to send id
 baseRouter.post( "/delete" , async function(req,res) {
 try{   //debugger;
        return  await mongoWrapper.delete(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        opt.data.delete.checksArray, //--check functions
        opt.data.delete.backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
 });

 return baseRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getBaseRouter;

here is mongowrapper.js
/*
* 2023-6-26 : There is error in delete, it does not send back delResult.
*
*/
require('dotenv').config();
const getData = require('./getData');  
const checkMax = require('./checks/checkMax');
const skillzaErrList = require('./skillzaaError/skillzaaErrList');
/////////////////////////////////////////////////
class MongoWrapper {
  constructor(mdl) {
    this.model = mdl;
    this.checks = {}; 
    this.checks.checkMax = checkMax;
  }

  async create(req,res,newObjDataFunction,getDataArray=[],checks=[],backendData={}) {
    try{
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }

        //------Run ChecksEnd ----------------
        const newObjData = newObjDataFunction(data); //unique to create
        let item = new this.model( newObjData );     
        await item.save();
        return res.status(200).json({item});
    
    } catch (error) {
      // debugger;
        throw error;
    }
  }
///////////////////////////////////
  async readOne(req,res,getDataArray=[],checks=[],backendData={}) {
    try{ // there should be an "id" in the getDataArray
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
        //--should  i check for userId ???????????????????????
      const finalItem = await this.model.findById(data.id);
      
      if(!finalItem){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item:finalItem});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
///////////////////////////////////
//--read many 
///////////////////////////////////
  async read(req,res,getDataArray=[],checks=[],backendData={}) {
    try{ 
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
      const finalItems = await this.model.find({"userId" : data.userId})

      if(!finalItems){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({items:finalItems});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
///////////////////////////////////
///////////////////////////////////
  async update(req,res,updateItemName,getDataArray=[],checks=[],backendData={}) {
    try{
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
      const options = { new: true, upsert: true }; 
      const finalItem = await this.model.findByIdAndUpdate( data[updateItemName]._id , data[updateItemName],options);
      
      if(!finalItem){
        throw skillzaErrList.getErr("failedToUpdate");  
      }
      return res.status(200).json({item:finalItem});
  
    } catch (error) {
        throw error;
    }
  }
///////////////////////////////////
///////////////////////////////////
  async delete(req,res,getDataArray=[],checks=[],backendData={}) {
    try{ // there should be an "id" in the getDataArray
    // debugger;
        const data = await getData(req,getDataArray);
        //------Run Checks-----------------
        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          await check(this.model,data,backendData);
        }
        // ------Run ChecksEnd ----------------
        // ------Core Activity ----------------
        //--should  i check if deleted ???????????????????????
        // debugger;
      const delResult = await this.model.deleteOne({ _id: data.id , userId :data.userId });

      return res.status(200).json({item:delResult});
  
    } catch (error) {//catch block is delt at top level here just throw
        throw error; 
    }
  }
} //class

module.exports = MongoWrapper;

/////////===checks

and finally baseRouterOptions




class BaseRouterOptions {
    constructor(){
    this.model = null; //mongo model object
    this.data = {}; //--just to create an object

 /////////////////////////////////////////////////
    this.data.create = {};//--just to create an object
 //{checkMaxValue : appConfig.MAX_CLASSES_ALLOWED} example backend data 
    this.data.create.backendData = {checkMaxValue : 50};
 // checksArray: PROVIDE FUNCTIONALITY BY ATTACHING FUNCTIONS
    this.data.create.checksArray = [];
 
    this.data.create.getNewObjDataFn = {}; //function
 // getDataArray: The req will have this data or auth will provide it
    this.data.create.getDataArray = []; 


/////////////////////////////////////////////////
    this.data.update = {};
    this.data.update.backendData = {};
    this.data.update.checksArray = [];
/////////////////////////////////////////////////
    this.data.read = {};
    this.data.read.backendData = {};
    this.data.read.checksArray = [];
/////////////////////////////////////////////////
    this.data.readone = {};
    this.data.readone.backendData = {};
    this.data.readone.checksArray = [];
/////////////////////////////////////////////////
    this.data.delete = {};
    this.data.delete.backendData = {};
    this.data.delete.checksArray = [];
/////////////////////////////////////////////////

    }

}


module.exports = BaseRouterOptions;