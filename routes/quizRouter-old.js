
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const Quiz = require("../models/quiz");
const Result = require("../models/result");

const respOk = require("./respOk");
const respFail = require("./respFail");
const newQuiz = require('../models/new_quiz.js');
const Subscriber = require("../models/subscriber.js");

/////////////////////////////////////////////////
const quizRouter = express.Router();
quizRouter.use(auth);
/////////////////////////////////////////////////



quizRouter.post("/new", async function(req, res) {
   try {
  //  debugger;
   const title = req.body.title;
  //  const token = req.body.token;
   const quizType  = req.body.quizType;

   const user= req.user;
   const userId  = user.userId;

///////////////////---limit new quiz--////
if (userId !== process.env.OWNER_ID ){
const prev = await Quiz.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Quizzes are allowed`,"maxQuizReached");
    // return res.status(400).json({ msg: ""});
    }
}
//////--limit ends
   const aa = newQuiz;
   aa.title =  title;
   aa.quizType =  quizType;
   //--dont know from where else to set default values since setting it in model does not wrok.
   aa.saveResponse =  true;
   aa.userId = userId; // importantay
  
    let quiz = new Quiz( aa );
    await quiz.save();
    const finalOkResp = respOk(res,"new quiz created",{ quiz });
    return finalOkResp;
  
  } catch (error) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});

quizRouter.post("/clone", async function(req, res) {
  try {
  debugger;
    const id = req.body.id;
        const user= req.user;
    const userId  = user.userId;
    const title = req.body.title;
    const originalQuiz = await Quiz.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }
    const newQuiz = new Quiz(originalQuiz.toObject());
    // userId is already set
    newQuiz._id = undefined;
    newQuiz.isNew = true;
    newQuiz.title = title;
    newQuiz.createdAt = Date.now();
    await newQuiz.save();
    return res.status(200).json({ quiz: newQuiz ,msg: "Cloned.." });
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});

quizRouter.post("/update", async function(req, res) {
  try {
  // debugger;
    const quiz = req.body.quiz; // the updated fields
    const id = quiz._id; // the updated fields
    const user= req.user;
    //  debugger;
    const userId  = req.userId;

     const options = { new: true, upsert: true }; 
    const updatedQuiz = await Quiz.findByIdAndUpdate( id , quiz,options);

    return res.status(200).json({ msg : "Quiz Saved" });
       
  } catch (error) {
    // return res.status(400).json({ error , msg : "failed to save"});
    const r = await respFail(res,"failed to save quiz","failedToSaveQuiz");
    return r;
  }
});
////////////////////////////////////////////////////////

quizRouter.get( "/featured" , async function(req,res) {
  try {
    const { limit = 20, count = 0 } = req.params;
  // const user= req.user;
    // const userId  = req.userId;

      const quizzes = await Quiz.find({"userId" : '64202224fd8518cb214bd138' , published : true })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({status : "ok" , quizzes });
  } catch(error) {
    // return res.status(400).json({status : "error" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});
// ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
quizRouter.get("/page/:limit?/:count?" , async function(req,res) {
  try {
    const { limit = 20, count = 0 } = req.params;
// debugger;
const user= req.user;
    // const userId  = user.userId;
   const userId  = req.userId;

      const quizzes = await Quiz.find({"userId" : userId})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({msg : "success" , quizzes });
  } catch(error) {
    // return res.status(400).json({msg : "failure" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
quizRouter.post("/find" , async function(req,res) {
  try {
    // debugger;
    const user= req.user;
    const userId  = user.userId;
    const id= req.body.quizId;
    const incommingQuiz = await Quiz.findById(id);
    if (incommingQuiz){
      // const userId = req.userId;
      // const user = await Subscriber.findById(userId);
      const incommingMembers = user.members;
    return res.status(200).json({ incommingQuiz, incommingMembers, status:"ok" });
    }
  } catch(error) {
    // return res.status(400).json({msg : "failure" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});
// ////////////////////////////////////////////////////////

////////////////////////////////////////////////////////

quizRouter.post( "/del" , async function(req,res) {
  try {
  // debugger;
    const user= req.user;
    const userId  = req.userId;
    const quizId= req.body.quizId;

//---check if quiz has responses
 const allQuizResults = await Result.find({"quizId" : quizId});
// debugger;
    if (allQuizResults.length > 0) {
       return res.status(404).json({msg : "The Quiz has responses. Failed to delete"  });
    }else{
      const r = await Quiz.deleteOne({ _id: quizId , userId });
    return res.status(200).json({ msg : "deleted" });
    }
//----------------------------------
  } catch(error) {
    // return res.status(400).json({msg : "failed to delete", error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});

quizRouter.post( "/question/delete" , async function(req,res) {
  try {
  // debugger;
    const questionId= req.body.questionId;
    const quizId= req.body.quizId;
    // const token= req.body.token;
  const user= req.user;
    const userId  = req.userId;


    const allQuizResults = await Result.find({"quizId" : quizId});
// debugger;
    if (allQuizResults.length > 0) {
       return res.status(400).json({msg : "This Question has responses. Failed to delete"  });
    }else{
    const q = await Quiz.findById(quizId);
    const qs = q.questions;
    
    for (let i = 0; i < qs.length; i++) {
      const quest = qs[i];
      if (quest._id == questionId){
        qs.splice(i, 1);
      }
    }
     q.questions = qs;
     q.save();

    return res.status(200).json({ msg : "deleted" , questions :q.questions });
    }
    
  } catch(error) {
    // return res.status(400).json({msg : "failed to delete", error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});

//-------------------------------------------------------
quizRouter.get('/all_questions', async (req, res) => {
  try {
  // const id = '64202224fd8518cb214bd138';
    const user= req.user;
    const userId  = req.userId;

    const questions = await Subscriber.findById(userId).select('questions');
    res.json({questions});
  } catch (err) {
    const r = await respFail(res,"unknown error","unknownError");
    return r;
    // res.status(500).json({ message: err.message });
  }
});


quizRouter.post('/question/new', async (req, res) => {
  const newQuestion = req.body.question;
  const quizId = req.body.quizId;
    const user= req.user;
    const userId  = req.userId;


  try {
    
     const quiz = await Quiz.findById(quizId);

   quiz.questions.push(newQuestion); //--check this
    await quiz.save();

    res.status(200).json({ msg: 'Question updated successfully' ,questions :quiz.questions });
  } catch (err) {
    // console.error(err);
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
});
////////////////////////////////////////////////////////
module.exports = quizRouter;

////////////////////////////////////////////////////////


