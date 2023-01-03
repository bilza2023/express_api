const  express  =require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const {db,User} = require('./database/db.js');
const userRouter = require('./routes/userRoutes.js');

const jwt = require('jsonwebtoken');
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

