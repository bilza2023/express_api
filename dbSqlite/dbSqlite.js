const {Sequelize,DataTypes} =  require('sequelize');
const sqlite = require('sqlite3').verbose();
//-----------------------------------------------

const getUser = require('../models/userModel.js');
const getRegion = require('../models/regionModel.js');
const getCity = require('../models/citiesModel.js');
const getBusiness = require('../models/businessModel');
const getBusinessType  = require('../models/businessTypeModel');

////////////////////--database connection--////////////////////////
const db = new Sequelize({
    dialect: "sqlite",
    storage: 'fill4Sqlite.sqlite',
    logging: true,
});

////////////////////--user model--////////////////////////
const User = getUser( db , DataTypes);
const Region = getRegion( db , DataTypes);
const City = getCity( db , DataTypes);
const Business = getBusiness( db , DataTypes);
const BusinessType = getBusinessType( db , DataTypes);


////////////////////////////////////////////////////
// const forcedFlag = true;

const forcedFlag = false;
db.sync({forced: forcedFlag})
.then((result) => {

    if (forcedFlag==true){
        console.log("sqlite setup complete WITH FORCED .");
    }else {
        console.log("sqlite==> setup complete.");
    }
})
.catch ( err => {

throw new Error( "sqlite failure",err);
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

