require('dotenv').config();
const sgMail = require('@sendgrid/mail');
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
const express  =require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const db = require("./mongoDb/mongo.js");
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////

const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');
const resultRouter = require('./routes/resultRouter');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
const Quiz = require("./models/quiz.js");
const Subscriber = require("./models/subscriber.js");
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
app.use("/user",userRouter);
app.use("/quiz",quizRouter);
app.use("/result",resultRouter);

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api"});
});

//////////////////////////////////////////////////////
// app.get('/sendMail', async (req, res) =>{
// sgMail.setApiKey('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');
// const msg = {
//   to: 'skillzaa.com@gmail.com', // Change to your recipient
//   from: 'bilza2023@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then((resp) => {
//     // console.log(resp);
//     res.status(200).json({success :true ,  message : "Email Mail Sent..."});
//   })
//   .catch((error) => {
//     console.error(error)
//   });
// });



//-----middle ware
async  function  authToken(req, res, next) {
  const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.login = false;
      next();      
    }
    // get token from request header
    const token = req.headers.authorization.split(" ")[1];
    if(token == null || token == ""){
      return res.status(404).json({message : "Auth token not found:you may not be logged in."});
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from decoded token
    const userId = decoded.id;
    // find user by id
    const user = await Subscriber.findById(userId);
    req.user = user;
    req.login = true;
next();
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////







