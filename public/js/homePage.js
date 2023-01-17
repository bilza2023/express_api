
function populateSelect(ddpointer, dataArray) {
  ddpointer.innerHTML = "";
  for (let i = 0; i < dataArray.length; i++) {
    let option = document.createElement("option");
    option.text = dataArray[i].name;
    option.value = dataArray[i].id;
    // add option to select element
    ddpointer.add(option);
  }
}

///////////////

function updateRegions(e , regionsArray) {
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
    updateCards( "" ,regionsArray);
}//update regionsDD



////////////////////////////

function updateCards(e, regionsArray){
const regionId = document.getElementById("regionsDD").value;
    for (let i = 0; i < regionsArray.length; i++) {
        const element = regionsArray[i];
        if (element.id == regionId) {
        //---------------------
        const plumberData = document.getElementById("plumberData");
        plumberData.innerHTML = "";
        plumberData.innerHTML = `Available ${element.plumber}`;
        //---------------------
        const electritionData = document.getElementById("electritionData");
        electritionData.innerHTML = "";
        electritionData.innerHTML = `Available ${element.electrition}`;
        //--------------------- 
        const hometutorData = document.getElementById("tutorData");
        hometutorData.innerHTML = "";
        hometutorData.innerHTML = `Available ${element.tutor}`;
      
        
        }
        
    }
// console.log(regionId);
}

///////////////////////////////////////////////////
window.addEventListener("load", async function(){
try{
const rawCities = await axios.get('http://localhost/api/get_cities');
 var citiesArray = rawCities.data.cities;
 
const raw = await axios.get('http://localhost/api/regions_w_business_count');
var regionsArray = raw.data.regions; 
// console.log(regionsArray);
//////////////////////////////////////////////
document.getElementById("citiesDD")
.addEventListener("change",(event) => updateRegions(event,regionsArray )); 
//////////////////////////////////////////////
document.getElementById("regionsDD")
.addEventListener("change",(event) => updateCards(event,regionsArray ));

//////////////////////////////////////////////
populateSelect(citiesDD, citiesArray);
 updateRegions( "" ,regionsArray);

}catch(err){
console.log("failed to load data");
}

});
