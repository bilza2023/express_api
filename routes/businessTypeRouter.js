require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');

const businessTypeRouter = express.Router();
const {City,Region,BusinessType,Business}  = require('../dbSqlite/dbSqlite');

////////////////////////////////////////////////
businessTypeRouter.get("/delete" ,async function(req,res) {
const businessTypeIdToDelete = req.cookies.businessTypeIdToDelete;

const c = await Business.count({ where: { businessTypeId:businessTypeIdToDelete  } });

if ( c > 0 ){
    res.status(200).json({message :"This Business Type has businesses attached to it",success:false});
}else {
    const del = await BusinessType.del(businessTypeIdToDelete);
    if (del==true){
    res.status(200).json({message :"deleted",success:true});
    }else {
    res.status(200).json({message :"delete operation failed",success:false});
    }
}
});

//-------------------------------------------------------
businessTypeRouter.get('/', async (req, res) => {
const BusinessTypeArray = await BusinessType.findAll();
return res.status(200).render('businessTypePages/index',{BusinessTypeArray});
});
businessTypeRouter.get('/get_list', async (req, res) => {
const BusinessTypeArray = await BusinessType.findAll();
return res.status(200).json({BusinessTypeArray});
});

//-------------------------------------------------------
businessTypeRouter.get('/edit', async (req, res) => {
const BusinessTypeEditName = req.cookies.BusinessTypeEditName;
const businessTypeIdToEdit = req.cookies.businessTypeIdToEdit;

await BusinessType.update(businessTypeIdToEdit,{name : BusinessTypeEditName});
    
return res.status(200).json({success:true});
});
//-------------------------------------------------------


//-------------------------------------------------------
businessTypeRouter.get("/editForm" ,async function(req,res) {
const businessTypeIdToEdit = req.cookies.businessTypeIdToEdit;
const bzType = await BusinessType.read( businessTypeIdToEdit );
res.status(200).render('businessTypePages/edit',{name: bzType.name,id:bzType.id});
});

//-------------------------------------------------------
businessTypeRouter.get("/new" ,async function(req,res) {
// res.status(200).json({success:true});
const newBizTypeName = req.cookies.newBizTypeName;
    await BusinessType.create({ name: newBizTypeName});
res.status(200).json({message:"new Business Type created",success:true});
});

//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = businessTypeRouter;


