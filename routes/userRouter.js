
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



//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = userRouter;


