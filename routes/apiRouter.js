const express = require('express');
// const Model = require('../database/baseModal');
const {City,Region,BusinessType,Business}  = require('../dbSqlite/dbSqlite');

const regions_w_business_count_Controller = require('../controllers/regions_w_business_count_Controller');
const apiRouter = express.Router();

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
apiRouter.get("/test" , function(req,res) {
// const body = req.body;
// const name = body.name;
// const age = body.age;
res.status(200).send("all ok");
});


apiRouter.get("/get_cities_and_regions" , async function(req,res) {
const citiesSeq = await    City.findAll({where: {}});
const cities = citiesSeq.map(r => r.toJSON());

const regionSeq = await    Region.findAll({where: {}});
const regions = regionSeq.map(r => r.toJSON());

res.status(200).json({cities,regions });
});

apiRouter.get("/get_cities_regions_BusinessTypes" , async function(req,res) {
const citiesSeq = await    City.findAll({where: {}});
const cities = citiesSeq.map(r => r.toJSON());

const regionSeq = await    Region.findAll({where: {}});
const regions = regionSeq.map(r => r.toJSON());

const BusinessTypeSeq = await  BusinessType.findAll({where: {}});
const BTp = BusinessTypeSeq.map(r => r.toJSON());

res.status(200).json({cities,regions,BusinessType : BTp});
});

apiRouter.get("/get_cities" , async function(req,res) {
const cities = await    City.findAll();
res.status(200).json({cities});
});

apiRouter.get("/get_regions" , async function(req,res) {

const regions = await    Region.findAll({where: {}});
res.status(200).json({regions });
});


//--
apiRouter.get('/regions_w_business_count', async (req, res) =>{
regions_w_business_count_Controller(req, res);
});


apiRouter.post('/register_new_business', async (req, res) =>{
const body = req.body;
const name = body.name;
const number = body.number;
const description = body.description;
const regionId = body.regionId;
const businessTypeId = body.businessTypeId;
const data =  { name ,number , description,regionId, businessTypeId};

// console.log(data);

const business = await Business.create(data,{
  include: [Region, BusinessType]
});
});


//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = apiRouter;


