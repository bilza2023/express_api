const express = require('express');
const Model = require('../database/baseModal');


////////////////////////////////////////////////
const model = new Model("bilzaDb","users");
////////////////////////////////////////////////

const theTblRouter = express.Router();


/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
theTblRouter.post("/create" , function(req,res) {
const body = req.body;
const name = body.name;
const age = body.age;

const prom = model.create(name , age);
    prom.then( rows => {
    res.json( 
        {
        msg : "successful insert", 
        sysMsg:rows
    });
    })

    .catch( err => {
    // console.log(err);
    res.json( 
        {
        msg : `failed read : ${err}`, 
    });
    });
});

/////////////////////////////////////////////////
////////-----------------READ-----------/////////
////////////////////////////////////////////////

theTblRouter.get("/getAll" , function(req,res) {

const prom = model.getAll();
    prom.then( rows => {
    res.json( 
        {
        details : "sucessful read", 
        data:rows
    });
    })

    .catch( err => {
    // console.log(err);
    res.json( 
        {
        msg : `failed read : ${err}`, 
    });
    });
});
/////////////////////////////////////////////////
////////-----------------UPDATE---------/////////
////////////////////////////////////////////////

theTblRouter.patch("/update" , function(req,res) {
const body = req.body;
const name = body.name;
const age = body.age;
const id = body.id;

const prom = model.update(id,name,age);
    prom.then( rows => {
    res.json( 
        {
        details : "sucessful read", 
        data:rows
    });
    })

    .catch( err => {
    // console.log(err);
    res.json( 
        {
        msg : `failed read : ${err}`, 
    });
    });
});
//-------------------------------------------------------
/////////////////////////////////////////////////
////////-----------------DELETE---------/////////
////////////////////////////////////////////////

theTblRouter.delete("/delete" , function(req,res) {
const body = req.body;
const id = body.id;

const prom = model.delete(id);
    prom.then( rows => {
    res.json( 
        {
        details : "sucessful read", 
        data:rows
    });
    })

    .catch( err => {
    // console.log(err);
    res.json( 
        {
        msg : `failed read : ${err}`, 
    });
    });
});
//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = theTblRouter;


