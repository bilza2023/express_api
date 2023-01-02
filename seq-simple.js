const Sequelize =  require('sequelize');

const db = new Sequelize("bilzadb","root", "bils32611",{
dialect: "mysql",
host: "127.0.0.1",
port: '13306'
});

const Customer = db.define('customer', 
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
    }

});

db.sync()
.then((result) => {
// Customer.create({name :"aaaaa"});
// Customer.create({name :"bbb"});
// Customer.create({name :"ccccc"});
// Customer.create({name :"dddddd"});
// Customer.create({name :"eeeeee"});
// Customer.create({name :"fffffff"});
// return Customer.create({name :"gggggg"});
// console.log(result);
})
.then((result) => {
console.log("database setup complete.");
    // Customer.findAll()
  // .then((allCustomes) => {
    // console.log(allCustomes);
    // });
})

.catch ( err => {
throw new Error( "Database failure",err);
});

// Customer.create( {name : "54rr"} );
//  Customer.update({ name: 'Jane' }, { where: { id: 1 } });
// Customer.destroy({ where: { id: 1 } });

// Customer.findAll()
// .then(result => {
// console.log(result);
// });

Customer.findByPk(2).then(user => {
  
  console.log(user);

}).catch(error => {
  // handle the error
});


