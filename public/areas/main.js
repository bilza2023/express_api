
import genTable,{getGenTableObj} from "./genTable.js";

const  LIST_URL= "http://localhost/api/get_cities";

/////////////////////////////////////////////////
window.addEventListener('load',  () => {
refresh()
});

function refresh(){
axios.get("http://localhost/area/get_list")
.then(function (response) {
    const g = getGenTableObj();

    g.deleteFunction =  delFn;
    g.editFunction =  editFn;
    
    g.items = response.data.items;
    const table = genTable(g);
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").appendChild(table);
});

}



const delFn = (id) => {
                return function(){
                // console.log( `delete function ${id}`);
                 document.cookie = `areaIdToDelete=${id}`;  
      
                axios.get("http://localhost/area/delete")
                .then((response) => {
                  if (response.data.success == true){
                  refresh();
                  }else {
                  alert(response.data.message);
                  }
                });
                } 
}
const editFn = (id) => {
                return function(){
                // console.log( `delete function ${id}`);
                 document.cookie = `areaIdToEdit'=${id}`;  
      
                axios.get("http://localhost/area/editForm")
                .then((response) => {
                  if (response.data.success == true){
                  refresh();
                  }else {
                  alert(response.data.message);
                  }
                });
                } 
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
document.getElementById("newItemBtn").addEventListener("click",function(e){

const newAreaName = document.getElementById("newItemName").value;

if (newAreaName == ""){alert("Please enter a name"); return;}

document.getElementById("newItemName").value = "";

      document.cookie = `newAreaName=${newAreaName}`;  
      axios.get("http://localhost/area/new")
      .then((response) => {
        if (response.data.success == true){
          refresh();
        }else {
          alert(response.data.message);
        }
        //console.log(response);
      });
});