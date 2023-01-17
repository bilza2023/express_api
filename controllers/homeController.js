require('dotenv').config();

const jwt = require('jsonwebtoken');
////////////////////////////////////////////////
module.exports =  async (req, res ) => {

// return res.status(200).json({"ok" : "ok"});
try{
const accessToken = req.cookies.accessToken;

// res.status(200).send("ok");
jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {

  if (err) { //----error----
return res.status(200).render('index',{"login":false});

  } else {
return res.status(200).render('index',{"login":true});
  }

});
//--------------------------------------      
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to load home page." });
}

}
////////////////////////////////////////////////////

