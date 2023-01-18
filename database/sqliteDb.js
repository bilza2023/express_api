
const {Sequelize,DataTypes} =  require('sequelize');
const getUser = require('../models/userModel.js');
const getRegion = require('../models/regionModel.js');
const getCity = require('../models/citiesModel.js');
const getBusiness = require('../models/businessModel');
const getBusinessType  = require('../models/businessTypeModel');

//////////////////////////////////////////////////////////
const db = new Sequelize({
    dialect: "sqlite",
    storage: './database/db.sqlite',
    logging: true,
});
///////////////////////////////////////////////////////////////
const User = getUser( db , DataTypes);
const Region = getRegion( db , DataTypes);
const City = getCity( db , DataTypes);
const Business = getBusiness( db , DataTypes);
const BusinessType = getBusinessType( db , DataTypes);
////////////////////////////////////////////////////
Business.belongsTo(Region);
Business.belongsTo(User);
Business.belongsTo(BusinessType);
///////////////////////////////////////////////////////////////

// const forcedFlag = false;
// const forcedFlag = true;

db.sync({forced: true})
.then((result) => {
console.log("=======> Sqlite Db is running");
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

