
const getBusinessType =  (db,DataTypes) =>{
const BusinessType = db.define('businessTypes', 
  {
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,

    },
  type : {
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
//------------------------------

module.exports = getBusinessType;