
const {Sequelize,DataTypes} = require('sequelize');
const getUsers = require('./usersModel.js');

const getDb =  async ()=>{

    const sequelize = await new Sequelize("bilzadb","root", "bils32611",{
    dialect: "mysql",
    host: "127.0.0.1",
    port: '13306'
    });

//...................................
// const User = await getUsers(sequelize,DataTypes);
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
//...................................
    await sequelize.sync({forced :false});
    
sequelize.authenticate()
  .then((result) => {
    console.log('Connection has been established successfully');
})
  .catch((error) => {
    console.log('Unable to connect to the database:', error);
});
return {sequelize,User};
}



module.exports = getDb;
