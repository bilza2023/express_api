
const {Sequelize,DataTypes} =  require('sequelize');
const getUser = require('./userModel.js');
const getProject = require('./projectModel.js');


const db = new Sequelize("bilzadb","root", "bils32611",{
dialect: "mysql",
host: "127.0.0.1",
port: '13306'
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
User
}