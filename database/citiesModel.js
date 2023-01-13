

const getCity =  (db,DataTypes) =>{

const City = db.define('cities', 
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
 
return City;
}
//------------------------------
module.exports = getCity;