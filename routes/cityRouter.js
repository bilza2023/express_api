require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');

const cityRouter = express.Router();
const {City,Region,BusinessType,Business}  = require('../dbSqlite/dbSqlite');

////////////////////////////////////////////////
cityRouter.get("/delete" ,async function(req,res) {
const cityIdToDelete = req.cookies.cityIdToDelete;
// const cityIdToDelete = 1;

const c = await Region.count({ where: { cityId: cityIdToDelete } });
if ( c > 0 ){
    res.status(200).json({message :"This city has areas attached to it",success:false});
}else {
    const del = await City.del(cityIdToDelete);
    if (del==true){
    res.status(200).json({message :"deleted",success:true});
    }else {
    res.status(200).json({message :"delete operation failed",success:false});
    }
}
});

//-------------------------------------------------------
cityRouter.get("/new" ,async function(req,res) {

const newCityName = req.cookies.newCityName;
// const cityIdToDelete = 1;

const c = await City.create({ name: newCityName});
res.status(200).json({message:"new city created",success:true});
});

//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = cityRouter;


