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

    // res.status(200).send(user);
// return user;

// // const password = body.password;

// const rez = User.create({ name , email } );
// res.status(200).json({ name , email });

}

const getAllUsers = async (req, res) => {

    const users = await User.findAll({});

    res.status(200).send(users);

}


module.exports = {
addUser,
getAllUsers
}