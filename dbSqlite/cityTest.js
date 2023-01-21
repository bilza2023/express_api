
const {City} = require('./dbSqlite');

async function getCities(){
const r = await  City.findAll();
console.table(r);
}

getCities();
