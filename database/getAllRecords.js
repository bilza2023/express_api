// const pool = require("./database");


// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['users', 'id', userId];
// sql = mysql.format(sql, inserts);

function getAllRecords(pool){
   pool.query('SELECT * FROM firstdb.users', (err,result)=>{
    if (err) {
     console.log("panic",err)   
    }else {
        console.log("result",result);
        res.json( 
        {
        details : "sucessful read", 
        data:result
        });
    return result;
    }
   });
}
 

module.exports =  {getAllRecords}