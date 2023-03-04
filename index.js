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
////////////////////////////////////////////////
const mongoose = require('mongoose');

mongoose.connect( process.env.MONGO_DB_URL , { useNewUrlParser: true});
const db = mongoose.connection;

db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log("MongoDb ===> connection established"))

const Subscriber = require("./models/subscriber");
////////////////////////////////////////////////
const  { City } = require('./dbSqlite/dbSqlite');
const dbComController = require('./controllers/dbComController');   
const PORT = process.env.PORT || 80;

const apiRouter = require('./routes/apiRouter');
// const pagesRouter = require('./routes/pagesRouter');
// const loginRouter = require('./routes/loginRouter');
// const devRouter = require('./routes/devRouter');
// const cityRouter = require('./routes/cityRouter');
// const adminRouter = require('./routes/adminRouter');
// const businessTypeRouter = require('./routes/businessTypeRouter');
// const areaRouter = require('./routes/areaRouter');


const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
////////////////////////////////////////////////////
const app = express()
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"build")));
//..
// app.use(cors({origin: "http://localhost/"}));
app.use(express.json());
// app.use(cors({origin: process.env.HOME_URL})); //use this
app.use(cors( )); //working
// app.use(cors({ origin: '*' })); //working
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
// app.use("/",pagesRouter);
// app.use("/",loginRouter);
// app.use("/",devRouter);
app.use("/api",apiRouter);
// app.use("/admin",adminRouter);
// app.use("/city",cityRouter);
// app.use("/businessType",businessTypeRouter);
// app.use("/area",areaRouter);

//.. Templating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
///////////////////////////Routes////////////////////////

/**
    //--login-routes
1.register (form and process)
2.login (form and process)
3.logout (process)

4.Search Businesses - home page (form ,process , hydration)
5.register_business (form and process)
6.Businesses - list page (form/page)
7.Businesses -individual page (form/page)
8.Edit business
9.edit user profile.
---------------------
10.create region
 */

app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api, try api/get_cities or /dbtest"});
// res.sendFile(path.resolve('build/index.html'));
//---------------------------
});

app.get('/getUser/:id', async (req, res) =>{
try{
const id = req.params.id;
// const id = '6402fcb8b2ebd95935bff82a';
console.log(id);
    const subscriber = await Subscriber.findById(id);
        if (subscriber == null){
            return res.status(404).json({message : "Subscriber not found" });
        }else {
            return res.status(200).json({subscriber });
        }
}catch(err){
            return res.status(500).json({message : "server error!!!" });
    // console.error(err);
}
});
//---------------------------
app.get('/dbtest', async (req, res) =>{
try{
// res.status(200).json({success :true ,  message : "Welcome to the api"});
const subscribers = await Subscriber.find();
res.status(200).json({subscribers});
console.log(subscribers);
}catch(e){
console.log(e);
}
//---------------------------
});
app.post('/add', async (req, res) =>{
try{
// res.status(200).json({success :true ,  message : "Welcome to the api"});
const subscriber = new  Subscriber({
name : "abc",
email : "abc@example.com",
password : 232323 
});
const newSub = await subscriber.save();
res.status(200).json({msg : "success" , newSub});
// console.log(subscribers);
}catch(e){
console.log(e);
}
//---------------------------
});

app.post('/add_city', async (req, res) =>{
try {
const name = req.body.name;
// console.log(req.body);
const rez = await City.create({name});
res.status(200).json({success:true, message:"success"});
}catch(e){
res.status(200).json({success:false, message:"failed"});
}

//---------------------------
});


////////////////////////////////////////////////////////

app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







