require('dotenv').config();
// const  {db,User} = require('../database/db.js');
const  {db,User,Region,Business,BusinessType} = require('../dbSqlite/dbSqlite');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
const bcrypt = require('bcrypt');

//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
try{
const selectedRegionId = req.cookies.selectedRegionId;
const selectedBusinessTypeId = req.cookies.selectedBusinessTypeId;
// const businesses = Business.where({});

const businesses = await Business.where({ businessTypeId :selectedBusinessTypeId, regionId:selectedRegionId });

const BusinessName = await BusinessType.read(selectedBusinessTypeId);
const regionName = await Region.read(selectedRegionId);
// console.log(selectedRegionId);
// console.log(selectedBusinessTypeId);
// const region = 
res.status(200).render('businessPage', { businesses,BusinessName, regionName} );
///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to singin :" + err });
}

}
////////////////////////////////////////////////////
