require('dotenv').config();
const  {Business } = require('../dbSqlite/dbSqlite');
//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
try{

// const regionId = req.body.regionId;
// const businessTypeId = req.body.businessTypeId;
// //http://localhost/businesses/1/1
  const regionId = req.params.regionId;
  const businessTypeId = req.params.businessTypeId;

Business.findAll({
    where: {
    regionId: 1,
    businessTypeId : 1
    }
}).then( buz =>{
const businesses = buz.map(business => business.toJSON());
return res.status(200).render('businessesPage',{ businesses});
});
    
///////////////////////////////////////////////////////////////////

} catch(err){
    return res.status(400).json({  message : "failed to load." });
}

}
////////////////////////////////////////////////////

