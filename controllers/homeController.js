require('dotenv').config();
const  {db,User} = require('../database/db.js');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
const bcrypt = require('bcrypt');
const fs = require('fs');
//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"ok" : "ok"});
try{
    return res.status(200).render('index',{"login":false});
//--------------------------------------      
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to load." });
}

}
////////////////////////////////////////////////////

