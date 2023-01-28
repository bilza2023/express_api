function createTable(cities) {
document.getElementById("container").innerHTML = "";
  // Create the table element
  const table = document.createElement("table");
  table.classList.add("w-3/4", "text-white", "bg-black", "mx-auto");

  // Create the table head
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border-2", "border-gray-600", "px-4", "py-2");
  th1.textContent = "ID";
  const th2 = document.createElement("th");
  th2.classList.add("border-2", "border-gray-600", "px-4", "py-2");
  th2.textContent = "Name";
  const th3 = document.createElement("th");
  th3.classList.add("border-2", "border-gray-600", "px-4", "py-2");
  th3.textContent = "Edit";
  const th4 = document.createElement("th");
  th4.classList.add("border-2", "border-gray-600", "px-4", "py-2");
  th4.textContent = "Delete";
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);

  // Create the table body
  const tbody = document.createElement("tbody");
  for (const city of cities) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    td1.textContent = city.id;
    const td2 = document.createElement("td");
    td2.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    td2.textContent = city.name;
    const td3 = document.createElement("td");
    td3.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    const editLink = document.createElement("a");
    // editLink.href = "#";
    editLink.textContent = "Edit";
    editLink.classList.add("text-green-300", "hover:cursor-pointer");
    editLink.addEventListener("click", () => console.log(city.id));
    td3.appendChild(editLink);
    const td4 = document.createElement("td");
    td4.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    const deleteLink = document.createElement("a");

    deleteLink.classList.add("text-red-300", "hover:cursor-pointer");
    // deleteLink.href = "#";
    deleteLink.textContent = "Delete";
    deleteLink.addEventListener("click", () => {
      
      document.cookie = `cityIdToDelete=${city.id}`;  
      
      axios.get("http://localhost/city/delete")
      .then((response) => {
        if (response.data.success == true){
        refreshCities();
        }else {
        alert(response.data.message);
        }
      });
    });
    td4.appendChild(deleteLink);
2 / 2

tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
tbody.appendChild(tr);
}

// Append the head and body to the table
table.appendChild(thead);
table.appendChild(tbody);

// Append the table to the document
document.getElementById("container").appendChild(table);
}

// const citiesArray = [
// {id:1 , name:"Islamabad"},
// {id:2 , name:"Rawalpindi"},
// {id:3 , name:"Peshawar"},
// {id:4 , name:"Karachi"}
// ];





window.addEventListener('load',  () => {
refreshCities()
});

function refreshCities(){
axios.get('http://localhost/api/get_cities')
.then(function (response) {
  // alert(response.data.message);
  const cities = response.data;
  // console.log(cities);
  createTable(cities);
});

}

//////////////////
document.getElementById('newCityBtn')
.addEventListener("click", function(){

const newCityName = document.getElementById('newCityInput').value;
document.getElementById('newCityInput').value = "";

      document.cookie = `newCityName=${newCityName}`;  
      axios.get("http://localhost/city/new")
      .then((response) => {
        if (response.data.success == true){
        refreshCities();
        }else {
        alert(response.data.message);
        }
        //console.log(response);
      });
});