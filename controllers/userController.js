const  {db,User} = require('../database/db.js');

// const User = db.users;
const Projects = db.projects;
//-----------------------------------

const addUser = async (req, res ) => {
const body = req.body;
const name = body.name;
const email = body.email;

const user = await User.create({name,email});
res.status(201).json({user});
}

const deleteUser = async (req, res ) => {
const id = req.body.id;
console.log(id);

User.destroy({
  where: {
    id: id
  }
}).then(function() {
res.status(200).json({message:"success"});
  // The user with an id of 123 has been deleted
})
.catch(function(err) {
res.status(404).json({message: err.message});
});

}

const getAllUsers = async (req, res) => {

    const users = await User.findAll({});

    res.status(200).send(users);

}


module.exports = {
addUser,
getAllUsers,
deleteUser
}