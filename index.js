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
// const multer = require('multer');

const PORT = process.env.PORT || 80;

const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pagesRouter');
const devRouter = require('./routes/pagesRouter');

// const regionsController = require('./controllers/regionsController');

// const businessController = require('./controllers/businessesController');
const registerbusinessController = require('./controllers/registerbusinessController');

const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////////
const app = express()

// app.use(cors({origin:'https://localhost'}));
app.use(cors({origin: process.env.HOME_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",pagesRouter);
app.use("/api",apiRouter);
app.use("/dev",devRouter);

/////////////////////////////////////
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"public")));

// const upload = multer({ dest: 'uploads/' });

//.. Templating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// app.post('/signup', async (req, res) =>{
// signupController(req, res);
// });


app.get('/superuser', (req, res) => {
    superuserController(req, res);
});


app.get('/registerbusiness', (req, res) => {
registerbusinessController(req, res);
// return res.status(200).send('registerbusiness');
});
////////////////////////////////////////////////////////



app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







