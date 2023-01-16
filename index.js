require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................

const  express  =require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const PORT = process.env.PORT || 80;
const  {Business} = require('./database/db.js');
// const json_pretty = require('json-pretty');
// const {User} = require('./database/db.js');
const migration = require('./database/migration.js');
// const userRouter = require('./routes/homeRoute.js');
// const UserController = require('./controllers/userController');
const signupController = require('./controllers/signupController');
const signinController = require('./controllers/signinController');
const homeController = require('./controllers/homeController.js');
const regionsController = require('./controllers/regionsController.js');
const businessController = require('./controllers/businessesController');
const registerbusinessController = require('./controllers/registerbusinessController');
// const signoutController = require('./controllers/signoutController');
const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////////
const app = express()

// app.use(cors({origin:'https://localhost'}));
app.use(cors({origin: process.env.HOME_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//.. Route middlewares
// app.use("/users",userRouter);
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"public")));

const upload = multer({ dest: 'uploads/' });

//.. Templating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/////////////////////////////////////////////////////////////

app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});

app.get('/superuser', (req, res) => {
    superuserController(req, res);
});


app.get('/registerbusiness', (req, res) => {
registerbusinessController(req, res);
// return res.status(200).send('registerbusiness');
});
////////////////////////////////////////////////////////
app.get('/signupform', (req, res) => {
return res.status(200).render('signupform');
});
//..
app.post('/signup', async (req, res) =>{
signupController(req, res);
});
//..
app.get('/loginform', async (req, res) =>{
res.status(200).render('loginform');
});
//..
app.post('/signin', async (req, res) =>{
signinController(req, res);
});
//..
app.post('/getRegions', async (req, res) =>{
regionsController(req, res);
});
//..
app.post('/getBusinesses', async (req, res) =>{
businessController(req, res);
});
//..
app.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
return res.status(200).render('index',{"login":false});
});


app.get('/businesses', async (req, res) =>{
businessController(req, res);
//---------------------------
});

app.get('/checklogin', async (req, res) =>{
const accessToken = req.cookies.accessToken;
jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
  res.status(400).send("not logged in")
  } else {
  res.status(200).send("Login Success")
  }
});
//---------------------------
});

app.get('/', async (req, res) =>{
homeController(req, res);
//---------------------------
});

// --dont delete 
// app.get('/migration', async (req, res) =>{
// migration().then(()=>{
// res.status(200).json({"message": "DB Insert Success"});
// });
// });



app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







