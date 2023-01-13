const  {db,User,Province,City,Region} = require('./db.js');
const {Sequelize} =  require('sequelize');
/////////////////--migrations--------------------------------


module.exports =   async ( ) =>{

await User.destroy({where:{}});
await Region.destroy({where:{}});
await City.destroy({where:{}});
await Province.destroy({where:{}});


await createProvinces();
await createCities();
await createRegions();

///////////////-migration ends////////////////
}

//////////////////--createProvinces--////////////////////////////////
const createProvinces = async ()=>{
const provincesData = [
    {id : 1 , name : "Punjab"},
    {id : 2 , name : "Khyber-Pakhtunkhwa"},
    {id : 3 , name : "Sind"},
    {id : 4 , name : "Balochistan"},
];
await Province.bulkCreate(provincesData);
}

const createCities = async () => {
const citiesData = [
{id: 1, name: "Lahore", provinceId: 1},
{id: 2, name: "Faisalabad", provinceId: 1},
{id: 3, name: "Rawalpindi", provinceId: 1},
{id: 4, name: "Multan", provinceId: 1},
{id: 5, name: "Gujranwala", provinceId: 1},
{id: 6, name: "Bahawalpur", provinceId: 1},
{id: 7, name: "Sialkot", provinceId: 1},
{id: 8, name: "Sargodha", provinceId: 1},
{id: 9, name: "Jhelum", provinceId: 1},
{id: 10, name: "Sheikhupura", provinceId: 1},
{id: 11, name: "Peshawar", provinceId: 2},
{id: 12, name: "Mardan", provinceId: 2},
{id: 13, name: "Abbottabad", provinceId: 2},
{id: 14, name: "Swat", provinceId: 2},
{id: 15, name: "Dera Ismail Khan", provinceId: 2},
{id: 16, name: "Bannu", provinceId: 2},
{id: 17, name: "Karachi", provinceId: 3},
{id: 18, name: "Hyderabad", provinceId: 3},
{id: 19, name: "Sukkur", provinceId: 3},
{id: 20, name: "Larkana", provinceId: 3},
{id: 21, name: "Nawabshah", provinceId: 3},
{id: 22, name: "Quetta", provinceId: 4},
{id: 23, name: "Khuzdar", provinceId: 4},
{id: 24, name: "Turbat", provinceId: 4},
{id: 25, name: "Sibi", provinceId: 4},
{id: 26, name: "Chaman", provinceId: 4},

//--add more cities here with care
];
await City.bulkCreate(citiesData);
}

const createRegions = async () => {
  const regionsData = [
    {id: 1, name: "Region1-Lahore", cityId: 1},
    {id: 2, name: "Region2-Lahore", cityId: 1},
    {id: 3, name: "Region1-Faisalabad", cityId: 2},
    {id: 4, name: "Region2-Faisalabad", cityId: 2},
    {id: 5, name: "Region1-Rawalpindi", cityId: 3},
    {id: 6, name: "Region2-Rawalpindi", cityId: 3},
    {id: 7, name: "Region1-Multan", cityId: 4},
    {id: 8, name: "Region2-Multan", cityId: 4},
    {id: 9, name: "Region1-Gujranwala", cityId: 5},
    {id: 10, name: "Region2-Gujranwala", cityId: 5},
    {id: 11, name: "Region1-Bahawalpur", cityId: 6},
    {id: 12, name: "Region2-Bahawalpur", cityId: 6},
    {id: 13, name: "Region1-Sialkot", cityId: 7},
    {id: 14, name: "Region2-Sialkot", cityId: 7},
    {id: 15, name: "Region1-Sargodha", cityId: 8},
    {id: 16, name: "Region2-Sargodha", cityId: 8},
    {id: 17, name: "Region1-Jhelum", cityId: 9},
    {id: 18, name: "Region2-Jhelum", cityId: 9},
    {id: 19, name: "Region1-Sheikhupura", cityId: 10},
    {id: 20, name: "Region2-Sheikhupura", cityId: 10},
    {id: 21, name: "Region1-Peshawar", cityId: 11},
    {id: 22, name: "Region2-Peshawar", cityId: 11},
    {id: 23, name: "Region1-Mardan", cityId: 12},
    {id: 24, name: "Region2-Mardan", cityId: 12},
    {id: 25, name: "Region1-Abbottabad", cityId: 13},
    {id: 26, name: "Region2-Abbottabad", cityId: 13},
    {id: 27, name: "Region1-Swat", cityId: 14},
    {id: 28, name: "Region2-Swat", cityId: 14},
    {id: 29, name: "Region1-Dera Ismail Khan", cityId: 15},
    {id: 30, name: "Region2-Dera Ismail Khan", cityId: 15},
    {id: 31, name: "Region1-Bannu", cityId: 16},
    {id: 32, name: "Region2-Bannu", cityId: 16},
    {id: 33, name: "Region1-Karachi", cityId: 17},
    {id: 34, name: "Region2-Karachi", cityId: 17},
    {id: 35, name: "Region1-Hyderabad", cityId: 18},
    {id: 36, name: "Region2-Hyderabad", cityId: 18},
    {id: 37, name: "Region1-Sukkur", cityId: 19},
    {id: 38, name: "Region2-Sukkur", cityId: 19},
    {id: 39, name: "Region1-Larkana", cityId: 20},
    {id: 40, name: "Region2-Larkana", cityId: 20},
    {id: 41, name: "Region1-Nawabshah", cityId: 21},
    {id: 42, name: "Region2-Nawabshah", cityId: 21},
    {id: 43, name: "Region1-Quetta", cityId: 22},
    {id: 44, name: "Region2-Quetta", cityId: 22},
    {id: 45, name: "Region1-Khuzdar", cityId: 23},
    {id: 46, name: "Region2-Khuzdar", cityId: 23},
    {id: 47, name: "Region1-Turbat", cityId: 24},
    {id: 48, name: "Region2-Turbat", cityId: 24},
    {id: 49, name: "Region1-Sibi", cityId: 24},
    {id: 50, name: "Region2-Sibi", cityId: 24},
    {id: 51, name: "Region1-Chaman", cityId: 24},
    {id: 52, name: "Region2-Chaman", cityId: 24}
  ];
await Region.bulkCreate(regionsData);
}
    
