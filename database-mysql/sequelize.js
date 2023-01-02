
import Sequelize from 'sequelize';

export default function getsequelize(){ 
const  sequelize = new Sequelize("bilzadb","root", "bils32611",{
dialect: "mysql",
host: "127.0.0.1",
});
return sequelize;
}
// mosule.exports = sequelize;