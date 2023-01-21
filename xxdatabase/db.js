
const {Sequelize,DataTypes} =  require('sequelize');

const getUser = require('../models/userModel.js');
const getRegion = require('../models/regionModel.js');
const getCity = require('../models/citiesModel.js');
const getBusiness = require('../models/businessModel');
const getBusinessType  = require('../models/businessTypeModel');

////////////////////--database connection--////////////////////////
const db = new Sequelize(process.env.MYSQL_DATABASENAME,process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
dialect: "mysql",
logging: false,
host: "127.0.0.1",
port: process.env.MYSQL_PORT
});
////////////////////--user model--////////////////////////
const User = getUser( db , DataTypes);
const Region = getRegion( db , DataTypes);
const City = getCity( db , DataTypes);
const Business = getBusiness( db , DataTypes);
const BusinessType = getBusinessType( db , DataTypes);


//..Relationship
// City.hasMany(Region);
// User.belongsTo(Region);
////////////////////////////////////////////////////
// Business.belongsTo(City);
Business.belongsTo(Region);
Business.belongsTo(User);
Business.belongsTo(BusinessType);
////////////////////////////////////////////////////
// const forcedFlag = true;
const forcedFlag = false;
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
City,
Region,
Business,
BusinessType
}
