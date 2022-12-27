const {pool} = require('./connection'); 
/////////////////////////////////////////////////

class Model {
constructor(databaseName= "firstdb", tableName ="users") {
this.databaseName = databaseName;
this.tableName = tableName;
}

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
////////////////////////////////////////////////
create( name , age ){
console.log(name);

const pro = new Promise( (resolve, reject) =>{

pool.query(`INSERT INTO ${this.databaseName}.${this.tableName}  (name,age)  VALUES ( ? , ?)`,
 [name,age],

 (err,result)=>{
            if (err) {
                reject(err)   
            }else {
                resolve(result);
            }
        });
});
    return pro;
}

/////////////////////////////////////////////////
////////-----------------READ-----------/////////
////////////////////////////////////////////////
getAll( ){
const pro = new Promise( (resolve, reject) =>{
        pool.query(`SELECT * FROM ${this.databaseName}.${this.tableName}`, (err,result)=>{
            if (err) {
                reject(err)   
            }else {
                resolve(result);
            }
        });
});
    return pro;
}


/////////////////////////////////////////////////
////////-----------------UPDATE---------/////////
////////////////////////////////////////////////
update( id, name, age ){
const pro = new Promise( (resolve, reject) =>{
pool.query(

`UPDATE ${this.databaseName}.${this.tableName} SET name = ?, age = ? WHERE id= ?`,[name,age,id], 
(err,result)=>{
            if (err) {
                reject(err)   
            }else {
                resolve(result);
            }
        });
});
    return pro;
}



/////////////////////////////////////////////////
////////-----------------DELETE---------/////////
////////////////////////////////////////////////

delete(id){
const pro = new Promise( (resolve, reject) =>{
pool.query(`DELETE FROM ${this.databaseName}.${this.tableName} WHERE id= ?`,[id], (err,result)=>{
            if (err) {
                reject(err)   
            }else {
                    if (result.affectedRows === 0){
                        reject("id not found");

                    }else {
                        resolve(result);
                    }
            }
        });
});
    return pro;
}


}
///////////////////////////////////////////////////
module.exports = Model;
