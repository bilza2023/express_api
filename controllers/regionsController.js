require('dotenv').config();
const  {Region} = require('../database/db.js');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {


const cityId = req.body.cityId;
const regionNames  = await Region.findAll({
  where: {
    cityId: cityId
  }
});
console.log(regionNames);
res.status(200).json({regionNames});

}///end
