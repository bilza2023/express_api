
import Sequelize from 'sequelize';

const sequelizeCon = new Sequelize("bilzadb","root", "bils32611",{
dialect: "mysql",
host: "127.0.0.1",
});


mosule.exports = sequelizeCon;