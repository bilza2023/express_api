require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
const express  =require('express');
const cors = require('cors');
const path = require('path');
const db = require("./mongoDb/mongo.js");
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////

const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
const Quiz = require("./models/quiz.js");
const Subscriber = require("./models/subscriber.js");
const QuizResult = require("./models/quiz_result.js");
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

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api"});
});


app.get("/quizlist" , async function(req,res) {
  try {
    const quizes = await Quiz.find({});
    return res.status(200).json({msg : "success" , quizes });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
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

async  function  checkLogin(req) {
const token = req.body.token;
    
    if(token == null || token == ""){
      return  {user:null , isLogin :false};
    }
// verify token with JWT_SECRET
const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from decoded token
    const userId = decoded.id;
    // find user by id
    const user = await Subscriber.findById(userId);
    return  {user , isLogin :true};
}

app.post("/user_quiz" , async function(req,res) {

let userId;
const {user , isLogin} = await checkLogin(req);
    if (isLogin==false){
      return res.status(401).json({msg: "please login to save"});
    }else {
    userId = user._id;
    }
const quizes = await Quiz.find({userId : userId });//======>
      return res.status(200).json({ msg: "success",user,quizes });

});
app.get("/responses/:id" , async function(req,res) {
  try {
    const id = req.params.id;
    const results = await QuizResult.find({quizId:id});
    return res.status(200).json({results });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});

///////////////////////////////////////////////////////////////////////
app.post("/save_response" , async function(req,res) {

const quizResponse = req.body; 
console.log(quizResponse);

 const quizResult = new QuizResult(quizResponse); // create a new Quiz instance with the data
console.log("quizResult",quizResult);

const newQuizResult = await quizResult.save(); // save the Quiz to MongoDB
return res.json({newQuizResult , status: "ok"});
});

///////////////////////////////////////////////////////////////////////

app.post("/save_quiz" , async function(req,res) {

try{
// const {user , isLogin} = await checkLogin(req);

// let userId;
// if (isLogin==false){
// return res.status(401).json({msg: "please login to save"});
// }else {
// userId = user._id;
// }

const QuizData = req.body.quiz; 
// const QuizData = require('./quizzes/frontend_dev.js');
QuizData.userId = "6414ec4fa19c446f0e6d2b53";
// console.log(QuizData);
const quiz = new Quiz(QuizData); // create a new Quiz instance with the data
// console.log("quiz" , quizn);
  const newQuiz = await quiz.save(); // save the Quiz to MongoDB
  const newQuizId = newQuiz._id; // Access the _id field of the newQuiz object
return res.json({newQuiz ,newQuizId, status: "ok"});

}catch(error){
 return res.status(400).json({msg : "failured to save quiz." , error  });
}
});

app.get("/del" , async function(req,res) {

try{
const QuizJson = {
"title": "The Most Comprehensive Quiz Test",
"saveResponse" : true,
"introText" : "introText introText introText introText introText introText inText introText introText introText ",
"farewellText" : "farewellText farewellText farewellText farewellText farewellText farewellText farewellText farewellText ",
"showIntro" : true,
"showResult" : true,
"userId": "640c60780a87835ced6122af",

  "questions": [
    {
      "content": "How will it look if the question has more text than a simple single line?",
      "id": "6a1ca9f9-f592-4a20-bdc9-0b2e1c90e58a",
      "correctOption"  : "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
      "selectedOption" : null,
      "explanation" : "explanation explanation explanation explanation explanation explanation ",
      "options": [
        {
          "id": "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
          "content": "correct",
        },
        {
          "id": "38781586-0799-4428-8894-4abb074ea48d",
          "content": "option--2",
        },
        {
          "id": "33b0e2f5-e4ba-43f2-9e98-99eed20e0a72",
          "content": "option--3",
        },
        {
          "id": "02df4333-0af5-447c-8ea1-ac39dad4300f",
          "content": "option--4",
        }
      ],

    },
    {
      "content": "This is a more descriptive question with more text to overflow and create moe paragraphs. Also do mention that this is for real stuff and not jokes",
      "id": "d9f7c597-4950-4d4f-9499-de70a8bcbaba",
      "correctOption": "5954af8a-6d7d-4010-b2e6-52f0f895b81c",
      "selectedOption" : null,
      "explanation" : "explanation explanation explanation explanation explanation explanation ",
      "options": [
        {
          "id": "690766a5-c418-4dd4-95ab-ef43e549c6ee",
          "content": "option--1",
        },
        {
          "id": "5954af8a-6d7d-4010-b2e6-52f0f895b81c",
          "content": "correct",
        },
        {
          "id": "b3eb5235-25e1-4cf2-8233-41fc86506c45",
          "content": "option--3",
        },
        {
          "id": "db351619-3168-4f63-969c-53adf4a105ab",
          "content": "option--4",
        }
      ],
    },
     {
      "content": "This is a more descriptive question with more text to overflow and create moe paragraphs. Also do mention that this is for real stuff and not jokes. Also do mention that this is for real stuff and not jokes",
      "id": "6a1ca9f9-f592-4a20-bdc9-0b2e1c90e58a",
      "correctOption"  : "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
      "selectedOption" : null,
      "explanation" : "explanation explanation explanation explanation explanation explanation ",
      "options": [
        {
          "id": "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
          "content": "correct",
        },
        {
          "id": "38781586-0799-4428-8894-4abb074ea48d",
          "content": "jj nhbg  fddd",
        },
        {
          "id": "33b0e2f5-e4ba-43f2-9e98-99eed20e0a72",
          "content": "some great message",
        },
        {
          "id": "02df4333-0af5-447c-8ea1-ac39dad4300f",
          "content": "welcome to hell",
        }
      ],

    }
  ],
};
// console.log(QuizData);
const quiz = new Quiz(QuizJson); // create a new Quiz instance with the data
const newQuiz = await quiz.save(); // save the Quiz to MongoDB
return res.json({newQuiz , status: "ok"});

}catch(error){
        return res.status(400).json({msg : "failured to save quiz" , error  });
}
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////








