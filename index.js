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
const db = require("./mongoDb/mongo.js");
////////////////////////////////////////////////

const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
////////////////////////////////////////////////////

const app = express()
app.use(cookieParser());
//.. static files
// app.use(express.static(path.join(__dirname,"build")));
//..
app.use(express.json());
// app.use(cors({origin: "http://localhost/"}));
// app.use(cors({origin: process.env.HOME_URL})); //use this
app.use(cors( )); //working
// app.use(cors({ origin: '*' })); //working
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/user",userRouter);

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(200).json({success :true ,  message : "Welcome to the api"});
});

// app.get('/getUser/:id', async (req, res) =>{
// try{
// const id = req.params.id;
// // const id = '6402fcb8b2ebd95935bff82a';
// console.log(id);
//     const subscriber = await Subscriber.findById(id);
//         if (subscriber == null){
//             return res.status(404).json({message : "Subscriber not found" });
//         }else {
//             return res.status(200).json({subscriber });
//         }
// }catch(err){
//             return res.status(500).json({message : "server error!!!" });
//     // console.error(err);
// }
// });
//---------------------------
// app.get('/dbtest', async (req, res) =>{
// try{
// // res.status(200).json({success :true ,  message : "Welcome to the api"});
// const subscribers = await Subscriber.find();
// res.status(200).json({subscribers});
// console.log(subscribers);
// }catch(e){
// console.log(e);
// }
// //---------------------------
// });

// app.patch('/patch', async (req, res) =>{
// console.log(req);
// return res.status(200).json({ msg :"patch"})
// });

// app.delete('/delete', async (req, res) =>{
// console.log(req);
// return res.status(200).json({ msg :"delete"})
// });



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////








