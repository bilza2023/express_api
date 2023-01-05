

const populate = data =>{
document.getElementById("usersListDiv").innerHTML = "<p>...</p>";
let str = `<table class="table table-dark table-striped">`;

str +=  `<thead><td>Name</td><td>Email</td><td>Action</td></thead><tbody>`;

for (let ii = 0; ii < data.length; ii++) {

str+= "<tr>";

str+= "<td>";
str+= `${data[ii].id}: ${data[ii].name}`;
str+= "</td>";

str+= "<td>";
str+= data[ii].email;
str+= "</td>";

str+= "<td>";
str+= `<button type="button" class="btn btn-outline-info btn-sm mr-2"><i class="bi-eye-fill"></i> View</button>`;

str += `<button type="button" class="btn btn-outline-success btn-sm mr-2"><i class="bi-pencil-fill"></i> Edit</button>`;

str += `<button type="button" class="deleteButton btn btn-outline-danger btn-sm" data-id="${data[ii].id}"><i class="bi-trash-fill"></i> Delete</button>`;
str+= "</td>";

str+= "</tr>";

}
str += " </tbody></table>"
document.getElementById("usersListDiv").innerHTML =str;
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
///////////////--addDeleteBtnEvents 
addDeleteBtnEvents = ()=>{
const buttons = document.querySelectorAll('.deleteButton');

for (let button of buttons) {
  button.addEventListener('click', function() {
    const id = parseInt(this.getAttribute('data-id'));
    console.log(id);
              axios.post('http://localhost:8080/deleteUser', {
                 id : id
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
  });
}


}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


document.getElementById("show").addEventListener("click", e =>{
  axios.get('http://localhost:8080/allUsers')
              .then(function (response) {
                populate(response.data.users);
                addDeleteBtnEvents();
              })
              .catch(function (error) {
                console.log(error);
              });

});

