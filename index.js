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
// const  {db,User,State} = require('./database/db.js');
// const {User} = require('./database/db.js');
const migration = require('./database/migration.js');
// const userRouter = require('./routes/homeRoute.js');
// const UserController = require('./controllers/userController');
const signupController = require('./controllers/signupController');
const signinController = require('./controllers/signinController');
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

//--
app.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
return res.status(200).render('index',{"login":false});
// signoutController(req, res);
});



app.get('/', async (req, res) =>{
// const authHeader = req.headers['authorization'] ;
// const token = authHeader.split(' ')[1];
    const token = req.cookies.accessToken;

    jwt.verify(token,process.env.JWT_SECRET, (err, user)=>{
    if(err){
    res.user = null;

    const citiesArray = [
    "Lahore",
    "Rawalpindi",
    "Multan"    
    ];
    const regionsArray = [
    "sadar",
    "cant",
    "bahria town"    
    ];
    const businessArray = [
    "Plumber",
    "Electrition",    
    "Painter",    
    "Teacher",    
    ];
        return res.status(200).render('index',{"login":false,
        regionsArray,citiesArray , businessArray});
    }else {
    res.user = user;
        return res.status(200).render('index',{"login":true , user});
    }
//   console.log(user)
//   res.status(200).send(user);
    });
//---------------------------
});

// --dont delete 
// app.get('/migration', async (req, res) =>{
// migration().then(()=>{
// res.status(200).json({"message": "DB Insert Success"});
// });
// });
///////////////////////////////////////
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







