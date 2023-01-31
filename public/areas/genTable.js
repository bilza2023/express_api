

//..
export default function genTable(getGenTableObj) {
 
  // Create the table element
const table = document.createElement("table");
table.classList.add("w-3/4", "text-white", "bg-black", "mx-auto");
//....
const thead = tableHead(getGenTableObj.tableHeading);

 // Create the table body
  const tbody = document.createElement("tbody");
for (const item of getGenTableObj.items) {
    const tr = document.createElement("tr");
    addRow(tr,item,getGenTableObj.rowHeading);    
    addEditDelete(tr,item,getGenTableObj);    
  
  tbody.appendChild(tr);
}

// Append the head and body to the table
table.appendChild(thead);
table.appendChild(tbody);
// Append the table to the document
return table;
}


///////////////////////////////////////////////////////////
function addRow(tr,item,rowHeading){
for (let i = 0; i < rowHeading.length; i++) {
    const td = document.createElement("td");
    td.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    td.textContent = item[rowHeading[i]];
tr.appendChild(td);  
}
return tr;
}

function addEditDelete(tr,item,getGenTableObj){

    const td3 = document.createElement("td");
    td3.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    const editLink = document.createElement("a");
    
    editLink.textContent = "Edit";
    editLink.classList.add("text-green-300", "hover:cursor-pointer");
      editLink.addEventListener("click", () => {
      document.cookie = `cityIdToEdit=${item.id}`; 
      window.location.href = getGenTableObj.EDIT_FORM_URL; 
      });

    td3.appendChild(editLink);
    const td4 = document.createElement("td");
    td4.classList.add("border-2", "border-gray-600", "px-4", "py-2");
    const deleteLink = document.createElement("a");

    deleteLink.classList.add("text-red-300", "hover:cursor-pointer");
    // deleteLink.href = "#";
    deleteLink.textContent = "Delete";
    const df = getGenTableObj.deleteFunction(item.id);
    deleteLink.addEventListener("click",df); 
         
    td4.appendChild(deleteLink);

tr.appendChild(td3);
tr.appendChild(td4);
return tr;
}
///////////////////////////////////////////////////////////

function tableHead(tableHeading){
tableHeading.push("Edit");
tableHeading.push("Delete");

const thead = document.createElement("thead");
const tr = document.createElement("tr");

    for (let i = 0; i < tableHeading.length; i++) {
      const element = tableHeading[i];
        const th = document.createElement("th");
      th.classList.add("border-2", "border-gray-600", "px-4", "py-2");
      th.textContent = element;
      tr.appendChild(th);
    thead.appendChild(tr);
    }
return thead;
}

export function getGenTableObj(){
return {
items : [], 
tableHeading : ["id", "name"],
rowHeading : ["id", "name"],
EDIT_FORM_URL : "",
addEditDelete : true, 
deleteFunction : (id) => {
                return function(){console.log( `delete function ${id}`);} 
                }

}//return statement
}//fn ends

