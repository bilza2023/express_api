
//--Require
require('dotenv').config();


const Quiz = require("../models/quiz");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");


async function featuredQuiz (req, res) {
  try {
    const { limit = 20, count = 0 } = req.params;
  // const user= req.user;
    const userId  = req.user._id;

      const quizzes = await Quiz.find({userId , published : true })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({status : "ok" , quizzes });
  } catch(error) {
    // return res.status(400).json({status : "error" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}

module.export  = featuredQuiz;