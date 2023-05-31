require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const Survey = require("../models/survey/survey.js");

/////////////////////////////////////////////////
const routerTest = express.Router();
 
////////////////////////////////////////////////////////
routerTest.get('/inspect/:id', async (req, res) =>{
const survey = await Survey.findById(req.params.id);
res.status(200).json({survey});
});    

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


