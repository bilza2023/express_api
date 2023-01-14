require('dotenv').config();
const  {db,User} = require('../database/db.js');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
const bcrypt = require('bcrypt');

//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"ok" : "ok"});
try{
// const authHeader = req.headers['authorization'] ;
// const token = authHeader.split(' ')[1];
    // const token = req.cookies.accessToken;

    // jwt.verify(token,process.env.JWT_SECRET, (err, user)=>{
    // if(err){
    // res.user = null;

   
    const regionsArray = [
    "sadar",
    "cant",
    "bahria town"    
    ];
    const businessArray = [
    "Plumber",
    "Electrition",    
    "Painter",    
    "Teacher",    
    ];
        return res.status(200).render('index',{"login":false,
        regionsArray,citiesArray , businessArray});
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
const citiesArray = [
    { "id" : 1, "name" : "Karachi"},
    { "id" : 2, "name" : "Lahore" },
    { "id" : 3, "name" : "Faisalabad"},
    { "id" : 4, "name" : "Rawalpindi"},
    { "id" : 5, "name" : "Multan"},
    { "id" : 6, "name" : "Hyderabad"},
    { "id" : 7, "name" : "Gujranwala"},
    { "id" : 8, "name" : "Peshawar"},
    { "id" : 9, "name" : "Quetta"},
    { "id" : 10, "name" : "Islamabad"},
    { "id" : 11, "name" : "Sargodha"},
    { "id" : 12, "name" : "Sialkot"},
    { "id" : 13, "name" : "Bahawalpur"},
    { "id" : 14, "name" : "Sukkur"},
    { "id" : 15, "name" : "Jhang"},
    { "id" : 16, "name" : "Sheikhupura"},
    { "id" : 17, "name" : "Larkana"},
    { "id" : 18, "name" : "Gujrat"},
    { "id" : 19, "name" : "Mardan"},
    { "id" : 20, "name" : "Dera Ghazi Khan"},
    { "id" : 21, "name" : "Sahiwal"},
    { "id" : 22, "name" : "Nawabshah"},
    { "id" : 23, "name" : "Mingora"},
    { "id" : 24, "name" : "Okara"},
    { "id" : 25, "name" : "Mirpur Khas"},
    { "id" : 26, "name" : "Chiniot"},
    { "id" : 27, "name" : "Kasur"},
    { "id" : 28, "name" : "Rahim Yar Khan"},
    { "id" : 29, "name" : "Jhelum"},
    { "id" : 30, "name" : "Kamoke"},
    { "id" : 31, "name" : "Hafizabad"},
    { "id" : 32, "name" : "Mandi Bahauddin"},
    { "id" : 33, "name" : "Khanewal"},
    { "id" : 34, "name" : "Sadiqabad"},
    { "id" : 35, "name" : "Bhakkar"},
    { "id" : 36, "name" : "Jacobabad"},
    { "id" : 37, "name" : "Shikarpur"},
    { "id" : 38, "name" : "Muzaffargarh"},
    { "id" : 39, "name" : "Khuzdar"},
    { "id" : 40, "name" : "Chaman"},
    { "id" : 41, "name" : "Wah Cantonment"},
    { "id" : 42, "name" : "Mianwali"},
    { "id" : 43, "name" : "Khairpur"},
    { "id" : 44, "name" : "Attock"},
    { "id" : 45, "name" : "Mandi"},
    { "id" : 46, "name" : "Tando Allahyar"},
    { "id" : 47, "name" : "Kotri"},
    { "id" : 48, "name" : "Jhang Sadar"},
    { "id" : 49, "name" : "Dera Ismail Khan"},
    { "id" : 50, "name" : "Nowshera"}
];
