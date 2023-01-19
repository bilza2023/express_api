
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
    allowNull : true,
    },
  email : {
    type : DataTypes.STRING,
    allowNull : false,
    },
  accountType : {
    type : DataTypes.STRING,
    allowNull : true,
    },
  password : {
    type : DataTypes.STRING,
    allowNull : false,
    },
  description : {
   type : DataTypes.TEXT,
   allowNull : true,
  }

});
 
return User;
}
//------------------------------
module.exports = getUser;