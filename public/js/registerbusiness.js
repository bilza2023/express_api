
function populateSelect(ddpointer, dataArray) {
    try {
const selElm = document.getElementById(ddpointer);

  selElm.innerHTML = "";
  for (let i = 0; i < dataArray.length; i++) {
    let option = document.createElement("option");
    option.text = dataArray[i].name;
    option.value = dataArray[i].id;
    // add option to select element
    selElm.add(option);
  }
    }catch (e) {
        console.error(e.message);
    }
}

/////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////
window.addEventListener("load", async function(){
try{

const raw = await axios.get('http://localhost/api/get_cities_regions_BusinessTypes');
var regionsArray = raw.data.regions; 
var citiesArray = raw.data.cities; 
var BusinessTypeArray = raw.data.BusinessType; 
// console.log(regionsArray);
//////////////////////////////////////////////
document.getElementById("citiesDD")
.addEventListener("change",(event) => updateRegions(event,regionsArray )); 
//////////////////////////////////////////////
// document.getElementById("regionsDD")
// .addEventListener("change",(event) => updateCards(event,regionsArray ));

//////////////////////////////////////////////
populateSelect("citiesDD", citiesArray);
populateSelect("businessTypesDD", BusinessTypeArray);
 updateRegions( "" ,regionsArray);

}catch(err){
console.log("failed to load data");
}

});


/////////////////////////////////
document.getElementById("registerBusiness")
.addEventListener("click", function(e){
    const name = document.getElementById("nameInput").value;
    const number = document.getElementById("numberInput").value;
    const description = document.getElementById("descriptionInput").value;
    const regionId = document.getElementById("regionsDD").value;
    const businessTypeId = document.getElementById("businessTypesDD").value;
// const js = JSON.stringify({name,number, description,regionId,businessTypeId});

axios.post('http://localhost/api/register_new_business', {name,number, description,regionId,businessTypeId})
.then(function (response) {
   window.location.href = 'http://localhost';
                
})

.catch(function (error) {
  const err = JSON.parse(error.request.responseText).message;
      alert(err);
});

});