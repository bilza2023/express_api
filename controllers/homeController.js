require('dotenv').config();

const jwt = require('jsonwebtoken');
////////////////////////////////////////////////
module.exports =  async (req, res ) => {

try{
// const areas_businesses_countArray = await areas_businesses_count();
// console.log( areas_businesses_count);
//-------------------------------
const accessToken = req.cookies.accessToken;
jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
let loginValue = false;
  if (err) { //----error----
      loginValue = false
  } else {
      loginValue = true;
  }

return res.status(200).render('index',{"login":loginValue});
});
//--------------------------------------      
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to load home page." });
}

}
////////////////////////////////////////////////////

