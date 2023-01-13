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
const PORT = process.env.PORT || 80;
// const  {db,User,State} = require('./database/db.js');
// const {User} = require('./database/db.js');
const migration = require('./database/migration.js');
const userRouter = require('./routes/userRoutes.js');
// const UserController = require('./controllers/userController');
const signupController = require('./controllers/signupController');
const signinController = require('./controllers/signinController');
// const signoutController = require('./controllers/signoutController');
const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
////////////////////////////////////////////////////
const app = express()

app.use(cors({origin:'https://localhost'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//.. Route middlewares
app.use("/users",userRouter);
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"public")));

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

app.get('/signout', async (req, res) =>{
res.cookie(`accessToken`, "" );
// signoutController(req, res);
});



app.get('/', async (req, res) =>{
// console.log(req.cookies.accessToken);
//---------------------------
// const authHeader = req.headers['authorization'] ;
// console.log(authHeader);
// const token = authHeader.split(' ')[1];
const token = req.cookies.accessToken;

    jwt.verify(token,process.env.JWT_SECRET, (err, user)=>{
    if(err){
    res.user = null;
        return res.status(200).render('index',{"login":false});
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







