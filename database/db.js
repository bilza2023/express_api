// require('dotenv').config();

const {Sequelize,DataTypes} =  require('sequelize');
const getUser = require('./userModel.js');
const getProject = require('./projectModel.js');

////////////////////--database connection--////////////////////////
const db = new Sequelize(process.env.MYSQL_DATABASENAME,process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
dialect: "mysql",
host: "127.0.0.1",
port: process.env.MYSQL_PORT
});
////////////////////--user model--////////////////////////
const User = getUser( db , DataTypes)
const Project = getProject( db , DataTypes)


//..Relationship
User.hasMany(Project);


db.sync({forced: false})
.then((result) => {

console.log("database setup complete.");

})

.catch ( err => {

throw new Error( "Database failure",err);
});



//................
module.exports = {
db,
User,
Project
}
