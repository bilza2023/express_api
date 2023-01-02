const {createPool} = require('mysql2');
const dotEnv = require('dotenv');

///////////////////////////////////////////////
dotEnv.config();
///////////////////////////////////////////////
 const pool = new createPool({
 host : process.env.MYSQL_HOST,
 user : process.env.MYSQL_USER,
 port : process.env.MYSQL_PORT,

 password : process.env.MYSQL_PASSWORD,
 database : process.env.MYSQL_DATABASENAME,
 connectionLimit : 10
 });

//=========================================================
module.exports = {pool};
