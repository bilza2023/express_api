
require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const userRouter = express.Router();
const Subscriber = require("../models/subscriber");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
userRouter.post("/" , async function(req,res) {
try{
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

const subscriber = new  Subscriber({
name,
email,
password
});

        const newSub = await subscriber.save();
            return res.status(200).json({msg : "success" , newSub});
            // console.log(subscribers);
    }catch(error){
        // console.log(error);
        return res.status(400).json({msg : "failure" , error  });
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


