
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
const cardsDiv = document.getElementById("cardsDiv");
cardsDiv.innerHTML = "";
    for (let i = 0; i < regionsArray.length; i++) {

        if (regionsArray[i].id == regionId) {
        const businessesCountArray = regionsArray[i].businessesCountArray;
         //---------------------
        for (let j = 0; j < businessesCountArray.length; j++) {
          const businessItem = businessesCountArray[j];
          let newDiv = document.createElement("div");
          newDiv.setAttribute("class", "w-1/5 md:w-1/3 lg:w-1/5 bg-white rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer border border-gray-300 m-2 p-5");

          newDiv.innerHTML += `<h1>${businessItem.businessTypeName}</h1>`;
          newDiv.innerHTML += `<h1>Available : ${businessItem.count}</h1>`;
          newDiv.innerHTML += "</div>";
          
          cardsDiv.appendChild(newDiv);
        }
        }
    }
// console.log(regionId);
}

///////////////////////////////////////////////////
window.addEventListener("load", async function(){
try{
const rawCities = await axios.get('http://localhost/api/get_cities');
 var citiesArray = rawCities.data;
 
const raw = await axios.get('http://localhost/api/regions_w_business_count');
var regionsArray = raw.data.regions; 
console.log(regionsArray);
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
