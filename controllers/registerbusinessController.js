require('dotenv').config();
const jwt = require('jsonwebtoken');
const  {Region,City} = require('../dbSqlite/dbSqlite');
////////////////////////////////////////////////
module.exports =  async (req, res ) => {

try{
const accessToken = req.cookies.accessToken;
await jwt.verify(accessToken, process.env.JWT_SECRET);

}catch(e){
return res.status(200).render('loginform');
}

try{
const cities = await    City.findAll( );
const regions = await    Region.findAll( );
return res.status(200).render("registerbusiness", {"login":true,regions,cities});

}catch(e){
return res.status(400).send('failed to load');
}
  

  

// });

}
////////////////////////////////////////////////////

