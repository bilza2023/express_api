const {db,UserSeq,CitySeq,RegionSeq,BusinessSeq,BusinessTypeSeq} = require('./dbSequalize');
//-----------------------------------------------
const Table = require('./table');
////////////////////--user model--////////////////////////
const User = new Table( UserSeq );
const City = new Table( CitySeq );
const Region = new Table( RegionSeq );
const Business = new Table( BusinessSeq );
const BusinessType = new Table( BusinessTypeSeq );


//................
module.exports = {
db,
User,
City,
Region,
Business,
BusinessType
}

