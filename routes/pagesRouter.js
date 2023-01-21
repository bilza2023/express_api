const express = require('express');


const homeController = require('../controllers/homeController');
const cookieParser = require('cookie-parser');
////////////////////////////////////////////////
const pagesRouter = express.Router();
////////////////////////////////////////////////
pagesRouter.use(cookieParser());


pagesRouter.get('/', async (req, res) =>{
homeController(req, res);
//---------------------------
});


////////////////////////////////////////////////////////
module.exports = pagesRouter;


