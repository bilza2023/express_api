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

//--------------------------------------   

    const jsonData = await fs.readFile('./data/homePage.json', 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(JSON.stringify(data));
        return res.status(200).render('index',{"login":false,
        jsonData: JSON.parse(data) });
        // return res.status(200).json(JSON.stringify(jsonData));

        // res.setHeader('Content-Type', 'application/json');
        // res.send(data);
});    
    // }else {
    // res.user = user;
        // return res.status(200).render('index',{"login":true , user});
    // }
//   console.log(user)
//   res.status(200).send(user);
    // });
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to load." });
}

}
////////////////////////////////////////////////////

