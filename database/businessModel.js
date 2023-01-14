
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
  description : {
   type : DataTypes.TEXT,
   allowNull : true,
  }

});
 
return Business;
}
//------------------------------

module.exports = getBusiness;