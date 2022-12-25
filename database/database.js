
const {createPool} = require('mysql2');
const dotEnv = require('dotenv');

dotEnv.config();

 const pool = new createPool({
 host : process.env.MYSQL_HOST,
 user : process.env.MYSQL_USER,
 password : process.env.MYSQL_PASSWORD,
 database : process.env.MYSQL_DATABASENAME,
 connectionLimit : 10
 });


function listAll(){
 pool.query('SELECT * FROM firstdb.users', (err,result)=>{
    if (err) {
    console.log("panic",err)   
    }else {
   console.log("successful read from DB");
    return result;
    }
 
 });
}
 


function insert(name,age){
 pool.query(
 'INSERT INTO firstdb.users (name,age)  VALUES ( ? , ?)',
 [name,age], 
   (err,result)=>{
      if (err) {
      console.log("panic",err)   
      }else {
      console.log(result);
      }
   }
 );
}

module.exports = {insert,listAll,pool};


// module.exports = logger;