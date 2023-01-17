require('dotenv').config();
const jwt = require('jsonwebtoken');
const  {Region,City} = require('../database/db.js');
////////////////////////////////////////////////
module.exports =  async (req, res ) => {

try{
const accessToken = req.cookies.accessToken;
await jwt.verify(accessToken, process.env.JWT_SECRET);

}catch(e){
return res.status(200).render('loginform');
}

try{
const citiesSeq = await    City.findAll({where: {}});
const cities = citiesSeq.map(r => r.toJSON());

const regionSeq = await    Region.findAll({where: {}});
const regions = regionSeq.map(r => r.toJSON());

    return res.status(200).render("registerbusiness", {regions,cities});

}catch(e){
return res.status(400).send('failed to load');
}
  

  

// });

}
////////////////////////////////////////////////////

