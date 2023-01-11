require('dotenv').config();
const  {db,User} = require('../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"message":"success"});
try{
const email = req.body.email;
const password = req.body.password;
//--
if (email === undefined){
return res.status(404).json({ "message" : "email is missing."  });
}
if (password === undefined){
return res.status(404).json({ "message" : "password is missing."  });
}
//--
if (isValidEmail(email) === false) {
return res.status(404).json({ "message" : "email is not in correct format."  });
}
//--
if (isValidPassword(password) === false) {
return res.status(400).json({ "message" : "password is not valid."  });
}
//--
const isUnique = await isEmailUnique(email);
    if (isUnique==false) {
    return res.status(400).json({"message" : "Email is already taken."});
    }
//--
const hasedPassword = await bcrypt.hash(password, 2);

  const userObj  = {email,password:hasedPassword};
  await User.create(userObj);

        const accessToken = jwt.sign(userObj,process.env.JWT_SECRET);

        return res.status(201).json({  accessToken , email, password,hasedPassword, "message" : "account created successfully" });

}//try end

  catch(err){
    return res.status(400).json({  "message" : "failed to singup :" + err });
  }

}
////////////////////////////////////////////////////
//-- This is the end
const isEmailUnique = async  (email)=> {

const user  = await User.findOne({where: { email }});
// console.log(user);

  if (user==null) {
        return true;
  } else {
  // console.log("exists");
    return false;
  }
}

const isValidPassword =  (password)=> {
if (password.length >= 8) {return true;} else {return false;}
}



//--to remove every thing from a table
// db.User.destroy({
//   where: {},
//   truncate: true
// })