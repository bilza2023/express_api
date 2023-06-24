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
const routerSurvey = require('./routerSurvey/routerSurvey.js');
const routerTemplate = require('./routerTemplate/routerTemplate.js');
const routerTest = require('./routerModTest/routerModTest.js');
// const routerTest = require('./routerTest/routerTest.js');
const resultRouter = require('./routes/resultRouter');
const routerStudent = require('./routes/routerStudent.js');
const routerTag = require('./routes/routerTag.js');
const routerClass = require('./routes/routerClass.js');
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
app.use("/result",resultRouter);
app.use("/survey",routerSurvey);
app.use("/template",routerTemplate);
app.use("/student",routerStudent);
app.use("/class",routerClass);
app.use("/tag",routerTag);
app.use("/test",routerTest);

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
// const ret = Survey.findById()
res.status(200).json({success :true ,  message : "Welcome to skillza api"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////






