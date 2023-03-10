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
////////////////////////////////////////////////

const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
const Quiz = require("./models/quiz.js");
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

const QuizData = req.body; 
// console.log(QuizData);

 const quiz = new Quiz(QuizData); // create a new Quiz instance with the data
const newQuiz = await quiz.save(); // save the Quiz to MongoDB
return res.json({newQuiz , status: "ok"});
// return res.json({QuizData , status: "ok"});



// console.log(quiz);

// return res.status(200).json({msg : "Quiz saved successfully!" ,newQuiz});
//             // console.log(subscribers);
// }catch(error){
//         // console.log(error);
//         return res.status(400).json({msg : "failured to save quiz" , error  });
// }
});

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////








