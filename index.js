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
const quizRouter = require('./routes/quizRouter');
const resultRouter = require('./routes/resultRouter');
const nonAuthRouter = require('./routes/nonAuthRouter.js');

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
// const Quiz = require("./models/quiz.js");
// const Subscriber = require("./models/subscriber.js");
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
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////







