
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const userRouter = express.Router();
const Subscriber = require("../models/subscriber");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
userRouter.get("/secure" , async function(req,res) {
 try {
    // get token from request header
    const token = req.headers.authorization.split(" ")[1];
    if(token == null || token == ""){
    res.status(404).json({message : "Auth token not found:you may not be logged in."});
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user id from decoded token
    const userId = decoded.id;

    // // find user by id
    const user = await Subscriber.findById(userId);

    if (user) {
      return res.status(200).json({ msg: "success",user });
    } else {
      return res.status(401).json({ msg: "unauthorized" });
    }

  } catch (error) {
    return res.status(401).json({ msg: "unauthorized" });
  }

});
userRouter.post("/register" , async function(req,res) {
try{
const name = req.body.name;
const email = req.body.email;
const passwordPlain = req.body.password;

const password = await bcrypt.hash(passwordPlain,3);
// console.log(password);

const subscriber = new  Subscriber({
name,
email,
password
});
// console.log(subscriber);

        const newSub = await subscriber.save();
            return res.status(200).json({msg : "success" , newSub});
            // console.log(subscribers);
    }catch(error){
        // console.log(error);
        return res.status(400).json({msg : "failure" , error  });
}
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////
userRouter.post("/login" , async function(req,res) {
try{
const email = req.body.email;
// console.log(email);
const passwordPlain = req.body.password;
const user = await Subscriber.findOne({email});
  if (user == null) {
      return res.status(200).json({msg: "can not find email address"});
  }

  if (await bcrypt.compare(passwordPlain,user.password)) {

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

res.set("Authorization", `Bearer ${token}`);


return res.status(200).json({ msg: "compare success", token: token });


  }else {
      return res.status(200).json({msg: "login failed, the email and the password does not match"});
  }

}catch(error){
        // console.log(error);
        return res.status(400).json({msg : "failure" , error });
}
});
userRouter.post("/logout" , async function(req,res) {
try{
res.set("Authorization", ``);
return res.status(200).json({ msg: "compare success" });
}catch(error){
        return res.status(400).json({msg : "failure" , error });
}
});

////////////////////////////////////////////////////////
userRouter.get("/" , async function(req,res) {
  try {

    const subscribers = await Subscriber.find({});
    return res.status(200).json({msg : "success" , subscribers });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
userRouter.get("/page/:limit?/:count?" , async function(req,res) {
  try {
    const { limit = 2, count = 0 } = req.params;

    const subscribers = await Subscriber.find({}).limit(limit).skip(count);
    return res.status(200).json({msg : "success" , subscribers });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
userRouter.get("/:id" , async function(req,res) {
  try {
    const id= req.params.id;

    const subscriber = await Subscriber.findById(id);
    return res.status(200).json({msg : "success" , subscriber });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
userRouter.delete("/:id" , async function(req,res) {
  try {
    const id= req.params.id;

    await Subscriber.deleteOne({ _id: id });
    return res.status(200).json({msg : "success" });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});
////////////////////////////////////////////////////////
userRouter.patch("/:id", async function(req, res) {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const updatedSubscriber = await Subscriber.findByIdAndUpdate(id, { name, email, password }, { new: false });

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(400).json({ msg: "failure", error });
  }
});
//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = userRouter;


