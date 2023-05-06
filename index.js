require('dotenv').config();
// const sgMail = require('@sendgrid/mail');
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
const express  =require('express');
// const nodemailer = require('nodemailer');
const cors = require('cors');
// const path = require('path');
const db = require("./mongoDb/mongo.js");
// const jwt = require('jsonwebtoken');
////////////////////////////////////////////////

const userRouter = require('./routes/userRouter');
const quizRouter = require('./quizRouter/quizRouter');
const resultRouter = require('./routes/resultRouter');
const nonAuthRouter = require('./routes/nonAuthRouter.js');

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
// const Quiz = require("./models/quiz.js");

////////////////////////////////////////////////////

const app = express()
app.use(cookieParser());
//.. static files
// app.use(express.static(path.join(__dirname,"build")));
//..
app.use(express.json());
// app.use(cors({origin: "http://localhost/"}));
// app.use(cors({origin: process.env.HOME_URL})); //use this
app.use(cors( )); //working
// app.use(cors({ origin: '*' })); //working
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",nonAuthRouter);
app.use("/user",userRouter);
app.use("/quiz",quizRouter);
app.use("/result",resultRouter);

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api"});
});

const Survey = require("./models/survey/survey.js");
const {SurveyQuestion,SurveyMCQ} = require("./models/survey/svyQuestion.js");
// const {ClickedLinkEvent, Event} = require("./models/event");
// const baseQuestion = require('./tests/surveyBaseQ.js')
const Svy = require('./models/survey/tests/getSurvey.js')
const baseMCQ = require('./models/survey/tests/getMCQ.js')

app.get('/survey', async (req, res) =>{
// Svy.questions.push(baseQuestion);
// Svy.questions.push(baseMCQ);
let survey = new Survey( Svy );
const mcq = new SurveyMCQ(baseMCQ);
// const mcq = new SurveyMCQ(baseMCQ);
await mcq.save();
survey.questions.push(mcq);

      //  debugger;
    await survey.save();
    return res.status(200).json({success :true , survey});
// When you create a generic event, it can't have a URL field...
// const genericEvent = new Event({ time: Date.now(), url: 'google.com' });
// assert.ok(!genericEvent.url);
  // await genericEvent.save();

// But a ClickedLinkEvent can
// const clickedEvent = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
// assert.ok(clickedEvent.url);
// await clickedEvent.save();
// res.status(200).json({success :true ,  message : "Welcome to the api"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////







