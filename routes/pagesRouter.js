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

pagesRouter.get('/signupform', (req, res) => {
return res.status(200).render('signupform');
});

pagesRouter.get('/loginform', async (req, res) =>{
res.status(200).render('loginform');
});

//--keep it here since itdisplay a page i.e home page
pagesRouter.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
return res.status(200).render('index',{"login":false});
});
//-------------------------------------------------------
////////////////////////////////////////////////////////
module.exports = pagesRouter;


