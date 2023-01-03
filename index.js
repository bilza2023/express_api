const  express  =require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const {db,User} = require('./database/db.js');
const userRouter = require('./routes/userRoutes.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
////////////////////////////////////////////////////
const app = express()

app.use(cors({origin:'https://localhost:8080'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//.. Route middlewares
app.use("/users",userRouter);
//.. static files
app.use(express.static(path.join(__dirname,"public")));
//.. Templating Engine
app.set("view engine" , "ejs");
////////////////////////////////////////////////////


app.post('/login', async (req, res) =>{
const name = req.body.name;
const user  = {name};
const accessToken = jwt.sign(user,process.env.JWT_TOKEN);
res.status(200).json({  accessToken});
});

app.get('/proctected', async (req, res) =>{

const authHeader = req.headers['authorization'] ;
// console.log(authHeader);
const token = authHeader.split(' ')[1];

jwt.verify(token,process.env.JWT_TOKEN, (err, user)=>{

  if(err){res.status(401).json({failed:true});  }
  res.user = user;
  res.status(200).send(user);
});

});

app.get('/', async (req, res) =>{

  res.status(200).send('hello world')
});

// app.post('/addUser', function (req, res) {
// const body = req.body;
// const name = body.name;
// const email = body.email;
// // const password = body.password;

// const rez = User.create({ name , email } );
// res.status(200).json({ name , email });
// });

app.listen(PORT);

console.log(`listening on port ${PORT}`);

