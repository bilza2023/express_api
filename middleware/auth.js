require('dotenv').config();

const jwt = require('jsonwebtoken');
const Subscriber = require("../models/subscriber");


const auth = async (req,res,next)=>{

 try {
    // debugger;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // const token = req.token;
    // console.log("token",token);
    if(token == null || token == ""){
    return res.status(404).json({ msg : "Auth token not found:you may not be logged in."  , errormsg : "authError" });
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user id from decoded token
    const userId = decoded.id;

    // // find user by id
    const user = await Subscriber.findById(userId);

    if (user) {
          req.user = user;
          //-- in user table it is _id but for others it is "userId"
          req.userId = userId;
          // console.log(user);
          next();
          return;
    } else {
      return res.status(404).json({ msg : "User  not found:you may not be logged in."  , errormsg : "userNotFound" });
    }

  } catch (error) {
    return res.status(500).json({ msg : "Auth token not found:you may not be logged in."  , errormsg : "unownAuthError" });
  }
}

module.exports = auth;