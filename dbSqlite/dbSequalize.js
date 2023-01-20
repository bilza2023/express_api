const {Sequelize,DataTypes} =  require('sequelize');
const sqlite = require('sqlite3').verbose();
//-----------------------------------------------

const getUser = require('./models/userModel');
const getRegion = require('./models/regionModel.js');
const getCity = require('./models/citiesModel.js');
const getBusiness = require('./models/businessModel');
const getBusinessType  = require('./models/businessTypeModel');

////////////////////--database connection--////////////////////////
const db = new Sequelize({
    dialect: "sqlite",
    storage: 'fill4Sqlite.sqlite',
    logging: false,
});

////////////////////--user model--////////////////////////
const UserSeq = getUser( db , DataTypes);
const RegionSeq = getRegion( db , DataTypes);
const CitySeq = getCity( db , DataTypes);
const BusinessSeq = getBusiness( db , DataTypes);
const BusinessTypeSeq = getBusinessType( db , DataTypes);


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
UserSeq,
CitySeq,
RegionSeq,
BusinessSeq,
BusinessTypeSeq
}

