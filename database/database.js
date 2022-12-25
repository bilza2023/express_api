
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

function update(id,name,age){
 pool.query(
 
 'UPDATE firstdb.users SET name = ?, age = ? WHERE id= ?',
 [name,age,id], 
   (err,result)=>{
      if (err) {
         console.log("panic",err)   
      }else {
         console.log(result);
      }
   }
 );
}

function remove(id){

 pool.query(

 'DELETE FROM firstdb.users WHERE id= ?',
 [id], 
   (err,result)=>{
      if (err) {
         console.log("panic",err)   
      }else {
         console.log(result);
      }
   }
 );
}

module.exports = {remove,update,insert,listAll,pool};


// module.exports = logger;