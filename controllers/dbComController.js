require('dotenv').config();
const areas_businesses_count = require('../dbCom/areas_businesses_count/areas_businesses_count');
//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
try{
const r = await areas_businesses_count();
res.status(200).json( { r} );
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to singin :" + err });
}

}
////////////////////////////////////////////////////
