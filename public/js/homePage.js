
const businessArray = [
    { "name" : "Plumber"},
    {"name" :  "Electrition"},    
    {"name" :  "Painter"},    
    {"name" :  "Doctor"},    
    {"name" :  "Home-Tution"},    
    {"name" :  "Dentist"},    
    {"name" :  "Lawer"}    
];



const citiesArray = [
    { "id" : 1, "name" : "Karachi"},
    { "id" : 2, "name" : "Lahore" },
    { "id" : 3, "name" : "Faisalabad"},
    { "id" : 4, "name" : "Rawalpindi"},
    { "id" : 5, "name" : "Multan"},
    { "id" : 6, "name" : "Hyderabad"},
    { "id" : 7, "name" : "Gujranwala"},
    { "id" : 8, "name" : "Peshawar"},
    { "id" : 9, "name" : "Quetta"},
    { "id" : 10, "name" : "Islamabad"},
    { "id" : 11, "name" : "Sargodha"},
    { "id" : 12, "name" : "Sialkot"},
    { "id" : 13, "name" : "Bahawalpur"},
    { "id" : 14, "name" : "Sukkur"},
    { "id" : 15, "name" : "Jhang"},
    { "id" : 16, "name" : "Sheikhupura"},
    { "id" : 17, "name" : "Larkana"},
    { "id" : 18, "name" : "Gujrat"},
    { "id" : 19, "name" : "Mardan"},
    { "id" : 20, "name" : "Dera Ghazi Khan"},
    { "id" : 21, "name" : "Sahiwal"},
    { "id" : 22, "name" : "Nawabshah"},
    { "id" : 23, "name" : "Mingora"},
    { "id" : 24, "name" : "Okara"},
    { "id" : 25, "name" : "Mirpur Khas"},
    { "id" : 26, "name" : "Chiniot"},
    { "id" : 27, "name" : "Kasur"},
    { "id" : 28, "name" : "Rahim Yar Khan"},
    { "id" : 29, "name" : "Jhelum"},
    { "id" : 30, "name" : "Kamoke"},
    { "id" : 31, "name" : "Hafizabad"},
    { "id" : 32, "name" : "Mandi Bahauddin"},
    { "id" : 33, "name" : "Khanewal"},
    { "id" : 34, "name" : "Sadiqabad"},
    { "id" : 35, "name" : "Bhakkar"},
    { "id" : 36, "name" : "Jacobabad"},
    { "id" : 37, "name" : "Shikarpur"},
    { "id" : 38, "name" : "Muzaffargarh"},
    { "id" : 39, "name" : "Khuzdar"},
    { "id" : 40, "name" : "Chaman"},
    { "id" : 41, "name" : "Wah Cantonment"},
    { "id" : 42, "name" : "Mianwali"},
    { "id" : 43, "name" : "Khairpur"},
    { "id" : 44, "name" : "Attock"},
    { "id" : 45, "name" : "Mandi"},
    { "id" : 46, "name" : "Tando Allahyar"},
    { "id" : 47, "name" : "Kotri"},
    { "id" : 48, "name" : "Jhang Sadar"},
    { "id" : 49, "name" : "Dera Ismail Khan"},
    { "id" : 50, "name" : "Nowshera"}
];


const regionsArray = [
    { "id" : 1, "name" : "Cant" , cityId : 1},    
    { "id" : 2, "name" : "Sadar" , cityId : 1},    
    { "id" : 3, "name" : "Phase-1" , cityId : 1},    
    { "id" : 4, "name" : "Gulshan-abad" , cityId : 1},    
    { "id" : 5, "name" : "City" , cityId : 1},    
    { "id" : 6, "name" : "Main-colony" , cityId : 2},    
    { "id" : 7, "name" : "Bhains-coloney" , cityId : 2},    
    { "id" : 8, "name" : "Shadman" , cityId : 2},    
    { "id" : 9, "name" : "Sadar-link-road" , cityId : 2},    
    { "id" : 10, "name" : "Maindan" , cityId :2},    
];
       





console.log(citiesArray);

function populateSelect(ddpointer, dataArray) {
  // remove existing options
  ddpointer.innerHTML = "";
  // loop through dataArray
  for (let i = 0; i < dataArray.length; i++) {
    // create option element
    let option = document.createElement("option");
    // set option text and value
    option.text = dataArray[i].name;
    option.value = dataArray[i].id;
    // add option to select element
    ddpointer.add(option);
  }
}

///////////////
let citiesDD = document.getElementById("citiesDD");
citiesDD.addEventListener("change", updateRegions);

function updateRegions() {
  let citiesDD = document.getElementById("citiesDD");
  let regionsDD = document.getElementById("regionsDD");
  // get the selected city id
  let selectedCityId = citiesDD.value;
  // remove existing options from regionsDD
  regionsDD.innerHTML = "";
  // loop through regionsArray
  for (let i = 0; i < regionsArray.length; i++) {
    // check if the region belongs to the selected city
    if (regionsArray[i].cityId == selectedCityId) {
      // create option element
      let option = document.createElement("option");
      // set option text and value
      option.text = regionsArray[i].name;
      option.value = regionsArray[i].id;
      // add option to regionsDD
      regionsDD.add(option);
    }
  }
}//update regionsDD


