const express = require('express');


const UserRoutes = express.Router();


/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
UserRoutes.post("/" , function(req,res) {
// const body = req.body;
// const name = body.name;
// const age = body.age;
    res.status(200).json({message :"post"});
});

/////////////////////////////////////////////////
////////-----------------READ-----------/////////
////////////////////////////////////////////////

UserRoutes.get("/" , function(req,res) {
res.status(200).json({message :"get"});
});
/////////////////////////////////////////////////
////////-----------------UPDATE---------/////////
////////////////////////////////////////////////

UserRoutes.patch("/" , function(req,res) {
// const body = req.body;
// const name = body.name;
// const age = body.age;
// const id = body.id;
res.status(200).json({message :"patch"});
});
//-------------------------------------------------------
/////////////////////////////////////////////////
////////-----------------DELETE---------/////////
////////////////////////////////////////////////

UserRoutes.delete("/" , function(req,res) {
// const body = req.body;
// const id = body.id;
res.status(200).json({message :"delete"});
});
//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = UserRoutes;


