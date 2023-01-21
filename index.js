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
const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pagesRouter');
const loginRouter = require('./routes/loginRouter');
// const devRouter = require('./routes/devRouter');


const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {Region} = require('./dbSqlite/dbSqlite');

////////////////////////////////////////////////////
const app = express()

// app.use(cors({origin:'https://localhost'}));
app.use(cors({origin: process.env.HOME_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",pagesRouter);
app.use("/",loginRouter);
app.use("/api",apiRouter);
// app.use("/dev",devRouter);

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
///////////////////////////Routes////////////////////////

/**
    //--login-routes
1.register (form and process)
2.login (form and process)
3.logout (process)

4.register_business (form and process)
6.Search Businesses - home page (form ,process , hydration)
7.Businesses - list page (form/page)
8.Businesses -individual page (form/page)
5.Edit business
9.edit user profile.
---------------------
10.create region
 */


// app.get('/registerbusiness', (req, res) => {
// registerbusinessController(req, res);
// // return res.status(200).send('registerbusiness');
// });
////////////////////////////////////////////////////////

app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







