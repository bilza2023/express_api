const express = require('express');
const registerbusinessController = require('../controllers/registerbusinessController');
const businessPageController = require('../controllers/businessPageController');
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

pagesRouter.get('/businessPage', async (req, res) =>{
businessPageController( req, res);
//---------------------------
});

pagesRouter.get('/registerbusiness', (req, res) => {
registerbusinessController(req, res);
// return res.status(200).send('registerbusiness');
});

////////////////////////////////////////////////////////
module.exports = pagesRouter;


