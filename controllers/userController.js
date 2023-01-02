const db = require('../database/db');

const User = db.users;
const Projects = db.projects;



const addUser = async (info) => {

// let info = {
// name: "ddddd"
// }
    const user = await User.create(info);
    // res.status(200).send(user);
return user;
}

const getAllUsers = async (req, res) => {

    const users = await User.findAll({});

    res.status(200).send(users);

}


module.exports = {
addUser,
getAllUsers
}