require('dotenv').config();
const jwt = require('jsonwebtoken');
const  {Region} = require('../database/db.js');
////////////////////////////////////////////////
module.exports =  async (req, res ) => {

try{
const accessToken = req.cookies.accessToken;
jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
  if (err) { //----error----
    
    return res.status(200).render('loginform');
} else {

    Region.findAll({where: {}})
    .then( buz =>{
    const regions = buz.map(region => region.toJSON());
    return res.status(200).render("registerbusiness", {regions});
    });
}
});
//--------------------------------------      
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to load." });
}

}
////////////////////////////////////////////////////

