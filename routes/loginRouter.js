const express = require('express');


const homeController = require('../controllers/homeController');
const cookieParser = require('cookie-parser');
const signupController = require('../controllers/signupController');
const signinController = require('../controllers/signinController');

////////////////////////////////////////////////
const loginRouter = express.Router();
////////////////////////////////////////////////
loginRouter.use(cookieParser());


loginRouter.get('/', async (req, res) =>{
homeController(req, res);
//---------------------------
});
//---------------------------

loginRouter.post('/signup', async (req, res) =>{
signupController(req, res);
});
//---------------------------
loginRouter.post('/signin', async (req, res) =>{
signinController(req, res);
});

//---------------------------

loginRouter.get('/signupform', (req, res) => {
return res.status(200).render('signupform');
});

loginRouter.get('/loginform', async (req, res) =>{
res.status(200).render('loginform');
});

//--keep it here since itdisplay a page i.e home page
loginRouter.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
return res.status(200).render('index',{"login":false});
});


////////////////////////////////////////////////////////
module.exports = loginRouter;


