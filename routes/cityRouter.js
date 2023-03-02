require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');

const cityRouter = express.Router();
const {City,Region,BusinessType,Business}  = require('../dbSqlite/dbSqlite');

////////////////////////////////////////////////
cityRouter.post("/delete" ,async function(req,res) {

const idToDelete = req.body.idToDelete;

const c = await Region.count({ where: { cityId: idToDelete } });
if ( c > 0 ){
    res.status(200).json({message :"This city has areas attached to it",success:false});
}else {
    const del = await City.del(idToDelete);
    if (del==true){
    res.status(200).json({message :"deleted",success:true});
    }else {
    res.status(200).json({message :"delete operation failed",success:false});
    }
}
});

//-------------------------------------------------------
cityRouter.get('/', async (req, res) => {
const Cities = await City.findAll();
return res.status(200).render('manage_cities',{Cities});
});
//-------------------------------------------------------
cityRouter.post('/edit', async (req, res) => {
const cityIdToEdit = req.body.cityIdToEdit;
const cityEditName = req.body.cityEditName;

const r = await City.update(cityIdToEdit,{name : cityEditName});
return res.status(200).json({success:true});
});

//-------------------------------------------------------
cityRouter.get("/editForm" ,async function(req,res) {
const cityIdToEdit = req.cookies.cityIdToEdit;
const city = await City.read( cityIdToEdit );
res.status(200).render('editForm',{cityName: city.name,cityId:1});
});

//-------------------------------------------------------
cityRouter.post("/new" ,async function(req,res) {
const body = req.body
const name = body.name;
// const cityIdToDelete = 1;

const c = await City.create({ name});
res.status(200).json({message:"new city created",success:true});
});

//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = cityRouter;


