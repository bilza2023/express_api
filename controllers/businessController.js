require('dotenv').config();
const  {Business} = require('../database/db.js');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"ok":"ok"});

const regionId = req.body.regionId;
const businessTypeId = req.body.businessTypeId;
const businesses  = await Business.findAll({
  where: {
    regionId: regionId,
    businessTypeId: businessTypeId
  }
});
// console.log(regionNames);
res.status(200).json({businesses});

}///end
