const Sequelize =  require('sequelize');

const db = new Sequelize("bilzadb","root", "bils32611",{
dialect: "mysql",
host: "127.0.0.1",
port: '13306'
});
////////////////////--user model--////////////////////////
const User = db.define('user', 
{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,

    },
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    },
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    }

});
////////////////////--user model--////////////////////////
db.sync({forced: false})

.then((result) => {
console.log("database setup complete.");
})
.catch ( err => {
throw new Error( "Database failure",err);
});

// User.create( {name : "54rr"} );
//  User.update({ name: 'Jane' }, { where: { id: 1 } });
// User.destroy({ where: { id: 1 } });

// User.findAll()
// .then(result => {
// console.log(result);
// });

// User.findByPk(2).then(user => {
  
//   console.log(user);

// }).catch(error => {
//   // handle the error
// });


module.exports = {

db,
User

}