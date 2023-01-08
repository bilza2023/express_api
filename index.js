require('dotenv').config();
const  express  =require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const {User} = require('./database/db.js');
const userRouter = require('./routes/userRoutes.js');
const UserController = require('./controllers/userController');
const signupController = require('./controllers/signupController');
const signinController = require('./controllers/signinController');
const signoutController = require('./controllers/signoutController');
const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');

////////////////////////////////////////////////////
const app = express()

app.use(cors({origin:'https://localhost:8080'}));
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
app.get('/setcookie', (req, res) => {
    res.cookie(`accessToken`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxQGcuY29tIiwiaWQiOjIwLCJpYXQiOjE2NzMxNzc1NTV9.qZQQNZZiqdmQNewyFRECIxUNK_yxYLpslJk39TZpMNI`);


    res.send('Cookie have been saved successfully');
});
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});
/////////////////////////////////////////////////////////////
app.post('/signup', async (req, res) =>{
signupController(req, res);
});
app.post('/signin', async (req, res) =>{
signinController(req, res);
});
app.post('/signout', async (req, res) =>{
signoutController(req, res);
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


//---------------------------------------------
app.post('/updateUser', function (req, res) {
// const id = req.body.id;
// const name = req.body.name;
// const email = req.body.email;
// console.log(id,name,email);
UserController.updateUser(req, res);
});



app.post('/deleteUser', function (req, res) {
const id = req.body.id;
// console.log(id);
// res.status(200).send("the id is : " + id);
UserController.deleteUser(req, res);
});

app.post('/fakeJson', function (req, res) {
const fakeData = { name : "Bill" , email : "bill@bill.com" };

const json = JSON.stringify(fakeData);
res.status(200).json(json);

});

app.listen(PORT);




console.log( `listening on port ${PORT}`  );


