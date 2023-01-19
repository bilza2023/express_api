
const {UserSeq} = require('../dbSqlite');

/////////////////////////////////////////
class User {

constructor(sequalizeModel){
this.seqTable = sequalizeModel; 
}
//------------------CREATE----------------------------------
async  create(data) {
  try {
    const seqItem = await this.seqTable.create(data);
    // const item = seqItem.map(r => r.toJSON());  
    const item = seqItem.toJSON();
    return item;
  } catch (error) {
    console.error(`Failed to create new record. Error: ${error}`);
  }
}
//------------------READ----------------------------------
async  read(id) {
  try {
    const seqItem = await this.seqTable.findByPk(id );
    if (seqItem) {
      const item = seqItem.map(r => r.toJSON());  
      return item;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to fetch item with ID ${id}. Error: ${error}`);
  }
}
//------------------UPDATE----------------------------------
async  update(id, data) {
  try {
    const seqItem = await this.seqTable.update(data, { where: { id: id } });
    const item = seqItem.map(r => r.toJSON());
    return item;
  } catch (error) {
    console.error(`Failed to update item with ID ${id}. Error: ${error}`);
  }
}
//------------------Del----------------------------------
async  del(id) {
  try {
    const deletedCount = await this.seqTable.destroy({ where: { id: id } });
    if (deletedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to delete ID ${id}. Error: ${error}`);
  }
}
//------------------READ ALL-----------------------------
async  readAll() {
  try {
    const seqItem = await this.seqTable.findAll();
    if (seqItem) {
      const item = seqItem.map(r => r.toJSON());  
    //   console.log(item);
      return item;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to fetch items. Error: ${error}`);
  }
}
}//--user class ends

//-------font end
////////////////////////////////////
const user = new User(UserSeq);

async function useCreate(data){
await user.create(data);
}
// useCreate({name:"ddd" , password:"876543234567" , email:"user@example.com"});

async function useUpdate(id,data){
await user.update(id,data);
}
// useUpdate(1,{name:"ddd" , password:"876543234567" , email:"user@example.com"});

async function useRead(id){
const u  = await user.read(id);
// console.log(u);
}
// useRead(1);

async function useDel(id){
const u  = await user.del(id);
// console.log(u);
}
// useDel(1);


//--
async function useReadAll(){
const u  =  await user.readAll();
console.table(u);
}
useReadAll();