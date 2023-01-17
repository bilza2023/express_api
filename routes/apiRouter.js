const express = require('express');
// const Model = require('../database/baseModal');
const {City,Region}  = require('../database/db');

////////////////////////////////////////////////
// const model = new Model("bilzaDb","users");
////////////////////////////////////////////////
const signupController = require('../controllers/signupController');
const signinController = require('../controllers/signinController');
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
apiRouter.get("/get_cities" , async function(req,res) {
const citiesSeq = await    City.findAll({where: {}});
const cities = citiesSeq.map(r => r.toJSON());
res.status(200).json({cities});
});

apiRouter.get("/get_regions" , async function(req,res) {

const regionSeq = await    Region.findAll({where: {}});
const regions = regionSeq.map(r => r.toJSON());

res.status(200).json({regions });
});


apiRouter.post('/signup', async (req, res) =>{
signupController(req, res);
});

//..
//..
apiRouter.post('/signin', async (req, res) =>{
signinController(req, res);
});

//--
apiRouter.get('/regions_w_business_count', async (req, res) =>{
regions_w_business_count_Controller(req, res);
});


//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = apiRouter;


