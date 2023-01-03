
const getUser =  (db,DataTypes) =>{
const User = db.define('users', 
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
  email : {
    type : DataTypes.STRING,
    allowNull : false,
    }

});
 
return User;
}
//------------------------------
module.exports = getUser;