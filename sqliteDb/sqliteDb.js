
const {Sequelize,DataTypes} =  require('sequelize');

const sqliteDb = new Sequelize({
    dialect: "sqlite",
    storage: './db.sqlite',
    logging: true,
});
///////////////////////////////////////////////////////////////
const getBusinessType =  (db,DataTypes) =>{
const BusinessType = db.define('businessTypes', 
  {
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,

    },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
    },
  description : {
   type : DataTypes.TEXT,
   allowNull : true,
  }

});
 
return BusinessType;
}
///////////////////////////////////////////////////////////////
const BusinessType = getBusinessType(sqliteDb,DataTypes);

// const forcedFlag = false;
const forcedFlag = true;

sqliteDb.sync({forced: forcedFlag})
.then((result) => {
console.log("=======> Sqlite Db is running");
});



//................
module.exports = {
sqliteDb,
BusinessType
}
