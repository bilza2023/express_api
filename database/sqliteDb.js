
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

async function init(){
await User.sync();
await Region.sync();
await City.sync();
await Business.sync();
await BusinessType.sync();
////////////////////////////////////////////////////
//--not using relationship for now
// Business.belongsTo(Region);
// Business.belongsTo(User);
// Business.belongsTo(BusinessType);
///////////////////////////////////////////////////////////////
db.sync({forced: true})
.then((result) => {
console.log("=======> Sqlite Db is running");
});

}//init ends

init();


//................
module.exports = {
db,
User,
City,
Region,
Business,
BusinessType
}

