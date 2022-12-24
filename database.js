 const {createPool} = require('mysql2');

 const pool = new createPool({
 host : "localhost",
 user : "root",
 password : "bils32611",
 database : "firstdb",
 connectionLimit : 10
 });


 pool.query('SELECT * FROM firstdb.users', (err,result,fields)=>{
    if (err) {
    console.log("panic",err)   
    }else {
    console.log(result);
    }
 
 });