const {createPool} = require('mysql2');
const dotEnv = require('dotenv');

///////////////////////////////////////////////
dotEnv.config();
///////////////////////////////////////////////
 const pool = new createPool({
 host : process.env.MYSQL_HOST,
 user : process.env.MYSQL_USER,
 password : process.env.MYSQL_PASSWORD,
 database : process.env.MYSQL_DATABASENAME,
 connectionLimit : 10
 });

//=========================================================
module.exports = {pool};
