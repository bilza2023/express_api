// require('dotenv').config();

const {Sequelize,DataTypes} =  require('sequelize');
const getUser = require('./userModel.js');
// const getProject = require('./projectModel.js');
const getProvince = require('./provincesModel.js');
const getRegion = require('./regionModel.js');
const getCity = require('./citiesModel.js');

////////////////////--database connection--////////////////////////
const db = new Sequelize(process.env.MYSQL_DATABASENAME,process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
dialect: "mysql",
host: "127.0.0.1",
port: process.env.MYSQL_PORT
});
////////////////////--user model--////////////////////////
const User = getUser( db , DataTypes)
// const Project = getProject( db , DataTypes)
const Province = getProvince( db , DataTypes)
const Region = getRegion( db , DataTypes)
const City = getCity( db , DataTypes)


//..Relationship

Province.hasMany(City);
City.hasMany(Region);
User.belongsTo(Region);



////////////////////////////////////////////////////
////////////////////////////////////////////////////
const forcedFlag = true;
// const forcedFlag = false;
db.sync({forced: forcedFlag})
.then((result) => {

    if (forcedFlag==true){
        console.log("database setup complete WITH FORCED .");
    }else {
        console.log("database setup complete.");
    }


})

.catch ( err => {

throw new Error( "Database failure",err);
});



//................
module.exports = {
db,
User,
Province,
City,
Region
}
