require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const {Region,}  = require('../dbSqlite/dbSqlite');
const areaRouter = express.Router();
////////////////////////////////////////////////
areaRouter.get("/delete" ,async function(req,res) {
const areaIdToDelete = req.cookies.areaIdToDelete;

const c = await Region.count({ where: { regionId:areaIdToDelete  } });

if ( c > 0 ){
    res.status(200).json({message :"This Area has businesses attached to it",success:false});
}else {
    const del = await Region.del(areaIdToDelete);
    if (del==true){
    res.status(200).json({message :"deleted",success:true});
    }else {
    res.status(200).json({message :"delete operation failed",success:false});
    }
}
});

//-------------------------------------------------------
areaRouter.get('/', (req, res) => {
// res.status(200).render('admin');
// res.sendFile(path.join(__dirname, 'public/areas'), 'index.html');
//  res.sendFile(path.join(__dirname, 'public/areas/index.html'));
 res.sendFile(path.resolve('public/areas/index.html'));
});

// areaRouter.get('/', async (req, res) => {
// const BusinessTypeArray = await BusinessType.findAll();
// return res.status(200).render('businessTypePages/index',{BusinessTypeArray});
// });

areaRouter.get('/get_list', async (req, res) => {
const items = await Region.findAll();
return res.status(200).json({items});
});

//-------------------------------------------------------
areaRouter.get('/edit', async (req, res) => {
const BusinessTypeEditName = req.cookies.BusinessTypeEditName;
const businessTypeIdToEdit = req.cookies.businessTypeIdToEdit;

await BusinessType.update(businessTypeIdToEdit,{name : BusinessTypeEditName});
    
return res.status(200).json({success:true});
});
//-------------------------------------------------------


//-------------------------------------------------------
areaRouter.get("/editForm" ,async function(req,res) {
const businessTypeIdToEdit = req.cookies.businessTypeIdToEdit;
const bzType = await BusinessType.read( businessTypeIdToEdit );
res.status(200).render('businessTypePages/edit',{name: bzType.name,id:bzType.id});
});

//-------------------------------------------------------
areaRouter.get("/new" ,async function(req,res) {
// res.status(200).json({success:true});
const newAreaName = req.cookies.newAreaName;
    await Region.create({ name: newAreaName});
return res.status(200).json({message:"new Item created",success:true});
});

//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = areaRouter;


