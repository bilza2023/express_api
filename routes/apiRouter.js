require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');

const {City,Region,BusinessType,Business}  = require('../dbSqlite/dbSqlite');

const regions_w_business_count_Controller = require('../controllers/regions_w_business_count_Controller');
const areas_businesses_count = require('../dbCom/areas_businesses_count/areas_businesses_count');
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
const cities = await    City.findAll( );
// const cities = citiesSeq.map(r => r.toJSON());

const regions = await    Region.findAll( );
// const regions = regionSeq.map(r => r.toJSON());

const BTp = await  BusinessType.findAll( );
// const BTp = BusinessTypeSeq.map(r => r.toJSON());

res.status(200).json({cities,regions,BusinessType : BTp});
});

apiRouter.get("/get_cities" , async function(req,res) {
const cities = await    City.findAll();
// console.log(cities);
res.status(200).json(cities);
});

apiRouter.get("/get_regions" , async function(req,res) {
const regions = await    Region.findAll();
console.log(regions);
res.status(200).json({regions });
});


//--
apiRouter.get('/regions_w_business_count', async (req, res) =>{
// regions_w_business_count_Controller(req, res);

const regions =await areas_businesses_count();
res.status(200).json({regions});

});


apiRouter.post('/register_new_business', async (req, res) =>{

const accessToken = req.cookies.accessToken;
jwt.verify(accessToken, process.env.JWT_SECRET, async (err, user) => {
  if (err) { //----error----
  // return res.status(200).render('index',{"login":false});
  } else {
  const body = req.body;
const name = body.name;
const number = body.number;
const description = body.description;
const regionId = body.regionId;
const businessTypeId = body.businessTypeId;
const data =  { name ,number , description,regionId, businessTypeId, userId:user.id};
// console.log(data);
await Business.create(data);
return res.status(200).send("success");
  // return res.status(200).render('index',{"login":true});
}
});

});


//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = apiRouter;


