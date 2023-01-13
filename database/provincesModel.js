

const getProvince =  (db,DataTypes) =>{

const Province = db.define('provinces', 
{
  id : {
    type : DataTypes.STRING,
    allowNull : false,
    primaryKey : true,

    },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
    primaryKey : true,
    },
  description : {
   type : DataTypes.TEXT,
   allowNull : true,
  }
});
 
return Province;
}
//------------------------------
module.exports = getProvince;