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


function qry(){
 pool.query('SELECT * FROM firstdb.users', (err,result,fields)=>{
    if (err) {
    console.log("panic",err)   
    }else {
    console.log(result);
    }
 
 });
}
 


function insert(){
 pool.query('INSERT INTO firstdb.users (name,age)  VALUES ("ff" , 5)', (err,result,fields)=>{
    if (err) {
    console.log("panic",err)   
    }else {
    console.log(result);
    }
 
 });
}




 insert();
 qry();