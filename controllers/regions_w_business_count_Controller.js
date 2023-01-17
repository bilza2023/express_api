require('dotenv').config();
const  {Region,BusinessType,Business} = require('../database/db.js');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {
const businessTypesSeq = await   BusinessType.findAll({ where: {}});
const businessTypes = businessTypesSeq.map(r => r.toJSON());

const regionsSeq = await   Region.findAll({ where: {}});
const regions = regionsSeq.map(r => r.toJSON());

// const data = [];

for (let i = 0; i < regions.length; i++) {
    const region  = regions [i];

    for (let j = 0; j < businessTypes.length; j++) {
        const businessType = businessTypes[j];

        
        // const businessSeq = await   Business.findAll(
        // { where: { businessTypeId :businessType.id , regionId :region.i }});
        // const business = businessSeq.map(r => r.toJSON());
        const count = await Business.count({ where: { businessTypeId: businessType.id, regionId: region.id } });
        region[businessType.type] = count;
        
    }
// data.push(region);
// console.log(data);    
}


res.status(200).json({regions});

}///end
