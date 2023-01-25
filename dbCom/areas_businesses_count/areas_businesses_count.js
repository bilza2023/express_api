// require('dotenv').config();
const  {Region,BusinessType,Business} = require('../../dbSqlite/dbSqlite');
const AreasBusinessesCountItem = require('./areas_businesses_count_item');
////////////////////////////////////////////////
// module.exports =  async ( ) => {
async function areas_businesses_count(){

const businessTypes = await   BusinessType.findAll();
// console.log(businessTypes);
const regions = await   Region.findAll();
// console.log(regions);

// ///---loop 1 
for (let i = 0; i < regions.length; i++) {
    const region  = regions [i];
const businessesCountArray = [];    
///---loop 2
    for (let j = 0; j < businessTypes.length; j++) {
        const businessType = businessTypes[j];
        // const count = await Business.count({ businessTypeId: businessType.id, regionId: region.id });
        const count = await Business.count({ where: { businessTypeId: businessType.id, regionId: region.id } });
        // console.log(count);
        const businessItem = new AreasBusinessesCountItem(
        region.id,businessType.id,businessType.name,count);

        businessesCountArray.push(businessItem);
        // region[businessType.name] = count;
        
    }//--inner loop businessTypes
region.businessesCountArray = businessesCountArray;    
}//---outer loop- region ends

return regions;
// console.log(JSON.stringify(regions));    

}///end

// areas_businesses_count();

module.exports = areas_businesses_count;