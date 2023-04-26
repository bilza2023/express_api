
require('dotenv').config();

const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const userRouter = express.Router();
const Subscriber = require("../models/subscriber");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
userRouter.use(auth);
/////////////////////////////////////////////////

////////////////////////////////////////////////


userRouter.get('/members', async (req, res) => {
  try {
  // const id = '64202224fd8518cb214bd138';
  
  const id = req.user._id;
    const members = await Subscriber.findById(id).select('members');
    res.json({members});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



userRouter.post('/members/save', async (req, res) => {
  try {
  debugger;
    const user = req.user;
    const newMembers = req.body.members;
   user.members = newMembers;

   
    user.members = newMembers;
    await user.save();
const members = await user.members;
res.status(200).json({ msg: 'Members updated successfully' , members });
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});
userRouter.post("/register" , async function(req,res) {

try{
const email = req.body.email;
const passwordPlain = req.body.password;

const password = await bcrypt.hash(passwordPlain,3);
// console.log(password);
    const subscriber = new  Subscriber({
    email,
    password
    });
// console.log(subscriber);

    const newSub = await subscriber.save();
    return res.status(200).json({status : "ok"});
            // console.log(subscribers);
}catch(error){
        // console.log(error.code);
        if (error.code == 11000){
        return res.status(400).json({status : "error" , msg:"This email already exists"  });
        }else {
        return res.status(400).json({status : "error" , msg:"failed to register please try later."   });
        }
}
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////
userRouter.post("/login", async function (req, res) {
  try {
    const email = req.body.email;
    const passwordPlain = req.body.password;

    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await Subscriber.findOne({ email });
    if (user == null) {
      return res.status(404).json({ msg: "Email address not found" });
    }

    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

      // Set Authorization with Bearer token syntax also send as token 
      //(USE BOTH)
      res.set("Authorization", `Bearer ${token}`);
      return res.status(200).json({ msg: "Login successful", token: token });
    } else {
      return res.status(401).json({  msg: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({  msg: "Login failed", error });
  }
});

////////////////////////////////////////////////////////
module.exports = userRouter;


