require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
const  express  =require('express');
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
// console.log(QuizData);

 const quizResult = new QuizResult(quizResponse); // create a new Quiz instance with the data
const newQuizResult = await quizResult.save(); // save the Quiz to MongoDB
return res.json({newQuizResult , status: "ok"});
});

///////////////////////////////////////////////////////////////////////

app.post("/save_quiz" , async function(req,res) {

try{
const {user , isLogin} = await checkLogin(req);

let userId;
if (isLogin==false){
return res.status(401).json({msg: "please login to save"});
}else {
userId = user._id;
}

const QuizData = req.body.quiz; 
QuizData.userId = userId; //-assign here --must
// console.log(QuizData);
const quiz = new Quiz(QuizData); // create a new Quiz instance with the data
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








