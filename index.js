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
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
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

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api"});
});


///////////////////////////////////////////////////////////////////////
const Quiz = require("./models/quiz.js");
app.get("/save_quiz" , async function(req,res) {

const QuizData = {
  questions: [
    {
      content: 'What is the capital of France?',
      correctAnswer: 2,
      explanation: 'Paris is the capital of France.',
      answers: [
        { content: 'London' },
        { content: 'Madrid' },
        { content: 'Paris' },
        { content: 'Berlin' }
      ]
    },
    {
      content: 'What is the largest continent in the world?',
      correctAnswer: 0,
      explanation: 'Asia is the largest continent in the world.',
      answers: [
        { content: 'Asia' },
        { content: 'North America' },
        { content: 'Europe' },
        { content: 'Africa' }
      ]
    },
    {
      content: 'What is the highest mountain in the United States?',
      correctAnswer: 1,
      explanation: 'Mount Denali is the highest mountain in the United States.',
      answers: [
        { content: 'Mount Whitney' },
        { content: 'Mount Denali' },
        { content: 'Mount Rainier' },
        { content: 'Mount St. Helens' }
      ]
    }
  ]
};

 const quiz = new Quiz(QuizData); // create a new Quiz instance with the data
const newQuiz = await quiz.save(); // save the Quiz to MongoDB
return res.json({newQuiz , status: "ok"});



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








