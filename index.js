const  express  =require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const {db,User} = require('./database/db.js');

User.create( {name : "Tarzan" , email : "abc@xyz.com"} );
////////////////////////////////////////////////////
const app = express()

////////////////////////////////////////////////////
app.use(cors({origin:'https://localhost:8080'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
////////////////////////////////////////////////////

//..Authenticate DB


// User.create({name : "bbb44"});
// db.then(db => {
// db.u
// // console.log(db);
// });
////////////////////////////////////////////////////

app.get('/', async (req, res) =>{

  res.status(200).send('hello world')
});

app.post('/user', function (req, res) {
  addUser(req,res);
})

app.listen(PORT);

console.log(`listening on port ${PORT}`);

