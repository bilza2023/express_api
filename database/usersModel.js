
const getUsers = (sequelize,DataTypes)=>{

  const User =   sequelize.define('users', 
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
            }
        }

);
return User;
}
//------------------------------
module.exports = getUsers;