require('dotenv').config();
const  {Region} = require('../database/db.js');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"message":"success"});
const message = req.body.message;
res.status(200).json({message});

// const cityId = req.body.cityId;

}///end
