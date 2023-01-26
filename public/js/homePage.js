
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
          newDiv.setAttribute("class", "actionBtn w-1/5 md:w-1/3 lg:w-1/5 bg-white rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer border border-gray-300 m-2 p-5");
        
        // data-selectedBusinessId=''
        // newDiv.setAttribute("data-selectedBusinessTypeId", `${businessItem.businessTypeId}`);
        
        newDiv.addEventListener("click", function() {
        const selectedBusinessId = this.getAttribute("data-selectedBusinessId");

        document.cookie = `selectedBusinessTypeId=${businessItem.businessTypeId}`;
        document.cookie = `selectedRegionId=${regionId}`;
        // console.log("selectedBusinessId", selectedBusinessId);
        window.location.href = 'http://localhost/businessPage';
        });

        newDiv.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>`;
          const title = (businessItem.businessTypeName).toUpperCase();
          newDiv.innerHTML += `<h1>${title}</h1>`;
         
          newDiv.innerHTML += `<hr/>`;
          const c = businessItem.count==false ? 0 :businessItem.count;
          newDiv.innerHTML += `<h1>Available : ${c}</h1>`;
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
//////////////////////////////////////////////

//////////////////////////////////////////////
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
