
document.getElementById("plumberBtn")
.addEventListener("click", function(e){

e.preventDefault();

const selectedRegionId = document.getElementById('regionsDD').value;
const selectedBusinessTypeId = 1;

document.cookie = `selectedRegionId=${selectedRegionId}`;
document.cookie = `selectedBusinessTypeId=${selectedBusinessTypeId}`;
//   console.log("ok");
window.location.href = 'http://localhost/businessPage';   

});