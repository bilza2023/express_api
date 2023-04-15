
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const quizRouter = express.Router();
const Quiz = require("../models/quiz");
const newQuiz = require('../models/new_quizxx.js');
const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////

quizRouter.post("/new", async function(req, res) {
   try {
   const title = req.body.title;
   const token = req.body.token;
   const quizType  = req.body.quizType;
   const userId  = await checkLogin(token);

  if (userId == null) {
    return res.status(400).json({ msg: "please register or login" });
  }
///////////////////---limit new quiz--////
if (userId !== process.env.OWNER_ID ){
const prev = await Quiz.count({userId :userId});
    if (prev > 10){
    return res.status(400).json({ msg: "At the momnent no more than 10 Quizzes are allowed"});
    }
}
//////--limit ends
   const aa = newQuiz;
   aa.title =  title;
   aa.quizType =  quizType;
   aa.userId = userId; // importantay
  
    let quiz = new Quiz( aa );
    await quiz.save();
    return res.json({ quiz });
  
  } catch (error) {
    //--do not send error to the user
    // return res.status(400).json({ msg: "failured to create.", error });
    return res.status(400).json({ msg: "failured to create." });
  }
});

quizRouter.post("/update", async function(req, res) {
  try {
    const quiz = req.body.quiz; // the updated fields
    const id = quiz._id; // the updated fields
     const options = { new: true, upsert: true }; 
    const updatedQuiz = await Quiz.findByIdAndUpdate( id , quiz,options);

    return res.status(200).json({ code:0 , updatedQuiz });
       
  } catch (error) {
    return res.status(400).json({ code:1 ,error });
  }
});
////////////////////////////////////////////////////////

quizRouter.get( "/featured" , async function(req,res) {
  try {
    const { limit = 20, count = 0 } = req.params;

      const quizzes = await Quiz.find({"userId" : '64202224fd8518cb214bd138' , published : true })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({status : "ok" , quizzes });
  } catch(error) {
    return res.status(400).json({status : "error" , error  });
  }
});
// ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
quizRouter.get("/page/:limit?/:count?" , async function(req,res) {
  try {
    const { limit = 20, count = 0 } = req.params;
// debugger;
   const token = req.headers['authorization'];
   //---here is the place to remove Bearer if added
   const userId  = await checkLogin(token);

  if (userId == null) {
    return res.status(400).json({  msg: "please register or login", error });
  }
      const quizzes = await Quiz.find({"userId" : userId})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({msg : "success" , quizzes });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
quizRouter.post("/find" , async function(req,res) {
  try {
    const id= req.body.quizId;
    const incommingQuiz = await Quiz.findById(id);
    debugger;
    if (incommingQuiz){
      const userId = incommingQuiz.userId;
      const user = await Subscriber.findById(userId);
      const incommingMembers = user.members;
    return res.status(200).json({ incommingQuiz, incommingMembers, status:"ok" });
    }
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
// ////////////////////////////////////////////////////////
quizRouter.get("/show/:quizId" , async function(req,res) {
  try {
  const quizId  = req.params.quizId;
  // console.log(quizId)
    const quiz = await Quiz.findById( quizId );
      if (quiz.published == true){
        return res.status(200).json({ quiz, code:0 });
      }else {
        return res.status(200).json({ code: 2 });
      }
  } catch(error) {
    return res.status(400).json({code:3 , error  });
  }
});
////////////////////////////////////////////////////////
quizRouter.post( "/del" , async function(req,res) {
  try {
  // debugger;
    const id= req.body.id;
    const token= req.body.token;

  const userId  = await checkLogin(token);
  if (userId == null) {
    return res.status(400).json({ status:"error",  msg: "please register or login", error });
  }

    const r = await Quiz.deleteOne({ _id: id , userId });
    return res.status(200).json({status:"ok", msg : "deleted" });
  } catch(error) {
    return res.status(400).json({status : "error" ,msg : "failed to delete", error  });
  }
});
quizRouter.post( "/question/delete" , async function(req,res) {
  try {
  // debugger;
    const questionId= req.body.questionId;
    const quizId= req.body.quizId;
    // const token= req.body.token;

  // const userId  = await checkLogin(token);
  // if (userId == null) {
  //   return res.status(400).json({ status:"error",  msg: "please register or login", error });
  // }

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
  } catch(error) {
    return res.status(400).json({msg : "failed to delete", error  });
  }
});
//-------------------------------------------------------
quizRouter.get('/all_questions', async (req, res) => {
  try {
  const id = '64202224fd8518cb214bd138';
    const members = await Subscriber.findById(id).select('questions');
    res.json({questions});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


quizRouter.post('/question/new', async (req, res) => {
  const newQuestion = req.body.question;
  // const quizId = req.body.quizId;
  const quizId = '6439b3eb5c3ba7e9432be31e';
  // const token = req.body.token;
  const userId = '64202224fd8518cb214bd138';

  try {
    // const user = await Subscriber.findById(id);

    // if (!user) {
    //   return res.status(404).json({ success: false, message: 'User not found' });
    // }
     const quiz = await Quiz.findById(quizId);

   quiz.questions.push(newQuestion); //--check this
    await quiz.save();

    res.status(200).json({ msg: 'Question updated successfully' ,questions :quiz.questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
////////////////////////////////////////////////////////
module.exports = quizRouter;

////////////////////////////////////////////////////////
async function checkLogin(token) {
  try {
    // const token = req.body.token;
    if (token == null || token == "") {
      return null;
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from decoded token
    const userId = decoded.id;
    // find user by id--user still exists???
    const user = await Subscriber.findById(userId);
    
    if (!user) {
      return null;
    }
    
    return userId;
  } catch (e) {
    return null;
  }
}
