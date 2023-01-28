const express = require('express');
const { City} = require('../dbSqlite/dbSqlite');
const devRouter = express.Router();


devRouter.get('/getcookies', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});



//----
devRouter.get('/migration', async (req, res) =>{
migration().then(()=>{
res.status(200).json({"message": "DB migration Success"});
});
});

//----
// devRouter.get('/checklogin', async (req, res) =>{
// const accessToken = req.cookies.accessToken;
// jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
//   if (err) {
//   res.status(400).send("not logged in")
//   } else {
//   res.status(200).send("Login Success")
//   }
// });
// //---------------------------
// });


////////////////////////////////////////////////////////
// const devRouter = devRouter
module.exports = devRouter;


