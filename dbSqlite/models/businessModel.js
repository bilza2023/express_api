
const getBusiness =  (db,DataTypes) =>{

const Business = db.define('business', 
  {
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,

    },
  name : {
    type : DataTypes.STRING,
    allowNull : true,
    },
  number : {
    type : DataTypes.STRING,
    allowNull : true,
    },
  description : {
   type : DataTypes.TEXT,
   allowNull : true,
  },
  regionId : {
    type : DataTypes.INTEGER,
    allowNull : false,
  },
  userId : {
    type : DataTypes.INTEGER,
    allowNull : false,
  },
  businessTypeId : {
    type : DataTypes.INTEGER,
    allowNull : false,
  }

});
 
return Business;
}
//------------------------------

module.exports = getBusiness;