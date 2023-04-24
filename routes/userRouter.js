
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const userRouter = express.Router();
const Subscriber = require("../models/subscriber");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
// userRouter.get("/secure" , async function(req,res) {
//  try {
//     // get token from request header
//     const token = req.headers.authorization.split(" ")[1];
//     console.log("token",token);
//     if(token == null || token == ""){
//     res.status(404).json({message : "Auth token not found:you may not be logged in."});
//     }
//     // verify token with JWT_SECRET
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // get user id from decoded token
//     const userId = decoded.id;

//     // // find user by id
//     const user = await Subscriber.findById(userId);

//     if (user) {
//       return res.status(200).json({ msg: "success",user });
//     } else {
//       return res.status(401).json({ msg: "unauthorized" });
//     }

//   } catch (error) {
//     return res.status(401).json({ msg: "unauthorized" });
//   }

// });
userRouter.get('/members', async (req, res) => {
  try {
  const id = '64202224fd8518cb214bd138';
    const members = await Subscriber.findById(id).select('members');
    res.json({members});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



userRouter.post('/members/save', async (req, res) => {
  const newMembers = req.body.members;
  // const token = req.body.token;
  const id = '64202224fd8518cb214bd138';

  try {
    const user = await Subscriber.findById(id);
debugger;
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.members = newMembers;
    await user.save();
const members = await Subscriber.findById(id).select('members');
res.status(200).json({ msg: 'Members updated successfully' , members });
  } catch (err) {
    console.error(err);
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
// userRouter.get("/page/:limit?/:count?" , async function(req,res) {
//   try {
//     const { limit = 2, count = 0 } = req.params;

//     const subscribers = await Subscriber.find({}).limit(limit).skip(count);
//     return res.status(200).json({msg : "success" , subscribers });
//   } catch(error) {
//     return res.status(400).json({msg : "failure" , error  });
//   }
// });
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// userRouter.get("/:id" , async function(req,res) {
//   try {
//     const id= req.params.id;

//     const subscriber = await Subscriber.findById(id);
//     return res.status(200).json({msg : "success" , subscriber });
//   } catch(error) {
//     return res.status(400).json({msg : "failure" , error  });
//   }
// });
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
// userRouter.delete("/:id" , async function(req,res) {
//   try {
//     const id= req.params.id;

//     await Subscriber.deleteOne({ _id: id });
//     return res.status(200).json({msg : "success" });
//   } catch(error) {
//     return res.status(400).json({msg : "failure" , error  });
//   }
// });
// ////////////////////////////////////////////////////////
// userRouter.patch("/:id", async function(req, res) {
//   try {
//     const id = req.params.id;
//     const { name, email, password } = req.body;

//     const updatedSubscriber = await Subscriber.findByIdAndUpdate(id, { name, email, password }, { new: false });

//     return res.status(200).json({ msg: "success" });
//   } catch (error) {
//     return res.status(400).json({ msg: "failure", error });
//   }
// });
//-------------------------------------------------------
////////////////////////////////////////////////////////
// //-----middle ware
// const isLogin = async (req, res, next) => {
//   try {
//     // get token from request header
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ msg: "Unauthorized: Missing authorization header" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ msg: "Unauthorized: Missing token" });
//     }

//     // verify token with JWT_SECRET
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // get user id from decoded token
//     const userId = decoded.id;

//     // find user by id
//     const user = await Subscriber.findById(userId);

//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       return res.status(401).json({ msg: "Unauthorized: User not found" });
//     }
//   } catch (error) {
//     return res.status(401).json({ msg: "Unauthorized: Invalid token" });
//   }
// };

////////////////////////////////////////////////////////
module.exports = userRouter;


