
const {User} = require('./dbSqlite');


async function useCreate(data){
await User.create(data);
}
// useCreate({name:"parcha" , password:"876543234567" , email:"user@example.com"});

async function useUpdate(id,data){
await User.update(id,data);
}
// useUpdate(6,{ email:"parcha@y.com"});

async function useRead(id){
const u  = await User.read(id);
console.table(u);
}
// useRead( 5 );

async function useDel(id){
const u  = await User.del(id);
console.log("Del Operation ===>>>" , u);
}
// useDel(4);

//--
async function useReadAll(){
const u  =  await User.findAll();
console.table(u);
}
useReadAll();

async function useWhere(data){
const u = await User.where(data);
console.table(u);
}

// useWhere({ email : 'parcha@y.com'});