require('dotenv').config();
const  {Region,BusinessType,Business} = require('../dbSqlite/dbSqlite');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {
const businessTypes = await   BusinessType.findAll({ where: {}});
// const businessTypes = businessTypesSeq.map(r => r.toJSON());

const regions = await   Region.findAll({ where: {}});
// const regions = regionsSeq.map(r => r.toJSON());

// const data = [];

for (let i = 0; i < regions.length; i++) {
    const region  = regions [i];

    for (let j = 0; j < businessTypes.length; j++) {
        const businessType = businessTypes[j];

        
        const count = await Business.count({ businessTypeId: businessType.id, regionId: region.id });
        region[businessType.type] = count;
        
    }
// data.push(region);
// console.log(data);    
}


res.status(200).json({regions});

}///end
