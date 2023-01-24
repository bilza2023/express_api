require('dotenv').config();
const  {Region,BusinessType,Business} = require('../dbSqlite/dbSqlite');

////////////////////////////////////////////////
module.exports =  async (req, res ) => {
const businessTypes = await   BusinessType.findAll({ where: {}});

const regions = await   Region.findAll({ where: {}});

for (let i = 0; i < regions.length; i++) {
    const region  = regions [i];

    for (let j = 0; j < businessTypes.length; j++) {
        const businessType = businessTypes[j];

        
        // const count = await Business.count({ businessTypeId: businessType.id, regionId: region.id });
        const count = await Business.count({ where: { businessTypeId: businessType.id, regionId: region.id } });
        // console.log(count);
        region[businessType.name] = count;
        
    }
// data.push(region);
// console.log(data);    
}


res.status(200).json({regions});

}///end
