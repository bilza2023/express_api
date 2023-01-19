const  express  =require('express');
const cors = require('cors');
// const migration = require('./models/migration.js');
const {db,User,City,Region,Business,BusinessType} = require('./database/sqliteDb');
const migration = require('./database/sqlite_first_time_migrate');
const cookieParser = require('cookie-parser');
/////////////////////////////////////
const PORT = 3000;
const app = express()

/////////////////////////////////////
app.use(cors({origin:'https://localhost'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/////////////////////////////////////////////////////////////

// app.get('/sqliteMigrate', async (req, res) =>{
// await migration();
// res.status(200).json({"message": "Sqlite migration Success"});
// });
//----------------------------------------
app.get('/', async (req, res) =>{
const BusinessTypeSeq = await    BusinessType.findAll({where: {}});
const BusinessTypes = BusinessTypeSeq.map(r => r.toJSON());
// await createCities();
const CitySeq = await    City.findAll({where: {}});
const city = CitySeq.map(r => r.toJSON());

const regSeq = await    Region.findAll({where: {}});
const region = regSeq.map(r => r.toJSON());

const userSeq = await    User.findAll({where: {}});
const user = userSeq.map(r => r.toJSON());

const businessSeq = await    Business.findAll({where: {}});
const business = businessSeq.map(r => r.toJSON());

res.status(200).json({BusinessTypes,User:user,Business:business, City :city, Region :region});
});


app.get('/migrate', async (req, res) =>{
migration();
return res.status(200).send("Migration Success");
});

const createUsers = async ()=>{

await User.destroy({where:{}});

const password  = "$2b$04$14UoBguWzN7VVDxtMWZTDuzDz8e80GZjMz63tQnbAV03gEnYzWg.K"; 
const data = [
  {id : 1 , email : "abc@gmail.com" , password  ,accountType : "superuser"},
  {id : 2 , email : "abc1@gmail.com" , password },
  {id : 3 , email : "abc2@gmail.com" , password },
  {id : 4 , email : "abc3@gmail.com" , password },
  {id : 5 , email : "abc4@gmail.com" , password }
];
await User.bulkCreate(data);
}
app.get('/migrate_user', async (req, res) =>{

await createUsers();

const userSeq = await    User.findAll({where: {}});
const user = userSeq.map(r => r.toJSON());

res.status(200).json({User:user});
});

//----------------------------------------
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});

