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
const fs = require('fs');

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
const businessController = require('./controllers/businessController.js');
// const signoutController = require('./controllers/signoutController');
const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////////
const app = express()

app.use(cors({origin:'https://localhost'}));
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


/////////////////////////////////////////////////////////////

app.get('/signupform', (req, res) => {
return res.status(200).render('signupform');
});

app.post('/signup', async (req, res) =>{
signupController(req, res);
});


app.get('/loginform', async (req, res) =>{
res.status(200).render('loginform');
});


app.post('/signin', async (req, res) =>{
signinController(req, res);
});

app.post('/getRegions', async (req, res) =>{
regionsController(req, res);
});

app.post('/getBusinesses', async (req, res) =>{
businessController(req, res);
});


app.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
return res.status(200).render('index',{"login":false});
// signoutController(req, res);
});


app.get('/', async (req, res) =>{
homeController(req, res);
//---------------------------
});

app.get('/businesses/:regionId/:businessTypeId', async (req, res) => {
//http://localhost/businesses/1/1
  const regionId = req.params.regionId;
  const businessTypeId = req.params.businessTypeId;
  // do something with regionId and businessType
const businesses =   await   Business.findAll({
  where: {
    regionId: regionId,
    businessTypeId,businessTypeId
  }
});
res.status(200).render('businessesPage', {  businesses  });
//res.send(`Listing businesses of type ${businessType} in region ${regionId}`);
});
// --dont delete 
app.get('/migration', async (req, res) =>{
migration().then(()=>{
res.status(200).json({"message": "DB Insert Success"});
});
});
///////////////////////////////////////
// app.post('/getpost', async (req, res) =>{
// // console.log("GET POST");
// const message = req.body.message;
// res.status(200).json({message});
// //---------------------------
// });
///////////////////////////////////////
///////////////////////////////////////////////////////////////
// app.post('/upload', upload.single('image'), (req, res) => {
//   try {
//     // move the uploaded file to a permanent location
//     fs.renameSync(req.file.path, 'public/images/' + req.file.originalname);

//     // return a success response to the client
//     res.status(200).json({ message: 'Image uploaded successfully' });
//   } catch (err) {
//     // handle any errors
//     console.error(err);
//     res.status(500).json({ message: 'Error uploading image' });
//   }
// });
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







