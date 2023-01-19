const {db,User,City,Region,Business,BusinessType} = require('./dbSqlite');


// User.create({ email : "abc2@gmail.com" , password:"44562" });
// User.create({ email : "abc3@gmail.com" , password:"44562" });
// User.create({ name:"user4",  email : "abc4@gmail.com" , password:"44562" });


// User.findAll()
//   .then(users => {
//     console.log("======>>>",users);
//   })
//   .catch(err => {
//     console.error('Error while retrieving users:', err);
//   });

async function updateUserName(userId, newName) {
  try {
    await User.update({ name: newName }, { where: { id: userId } });
    console.log(`Successfully updated user with ID ${userId} to have a name of ${newName}.`);
  } catch (error) {
    console.error(`Failed to update user with ID ${userId}. Error: ${error}`);
  }
}

updateUserName(1, "newName");

async function getAll(){
const usersSeq =   await   User.findAll();
const users = usersSeq.map(r => r.toJSON());
console.log("======>>>",users);
}

// getAll ();

async function update(userId, data) {
  try {
    await User.update(data, { where: { id: userId } });
    console.log(`Successfully updated user with ID ${userId}.`);
  } catch (error) {
    console.error(`Failed to update user with ID ${userId}. Error: ${error}`);
  }
}
//--
//  update(3 , {name:"user-no-3"});


async function read(userId) {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      console.log(user);
    } else {
        return false;
    }
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}. Error: ${error}`);
  }
}
const user3 = read(3);
// console.log("=======>>>",read(3));
