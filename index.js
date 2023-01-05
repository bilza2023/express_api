require('dotenv').config();
const  express  =require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const {db,User} = require('./database/db.js');
const userRouter = require('./routes/userRoutes.js');
const jwt = require('jsonwebtoken');
const  { engine } =  require('express-handlebars');
////////////////////////////////////////////////////
const UserController = require('./controllers/userController');

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
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render('templ2', {
    items: ['item 1', 'item 2', 'item 3']
  });
});
////////////////////////////////////////////////////
app.get('/new', (req, res) => {
  res.render('new', {
    title: 'My New Page',
    body: 'This is the body of my new page.',
    items: ['item 1', 'item 2', 'item 3']
  });
});
////////////////////////////////////////////////////

app.get('/handlebars', (req, res) => {
  res.render('home');
});


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

app.get('/message', async (req, res) =>{

  res.status(200).send('bilza project 5-Jan-2023');
});

app.post('/addUser', function (req, res) {
UserController.addUser(req, res);

// const body = req.body;
// const name = body.name;
// const email = body.email;
// // const password = body.password;

// const rez = User.create({ name , email } );
// res.status(200).json({ name , email });
});

app.listen(PORT);

console.log(`listening on port ${PORT}`);

