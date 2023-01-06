

const populateOne = ( ) =>{
axios.get('http://localhost:8080/allUsers')
              .then(function (response) {
                populate(response.data.users);
                addDeleteBtnEvents();
              })
              .catch(function (error) {
                console.log(error);
              });

}
const populate = data =>{
document.getElementById("usersListDiv").innerHTML = "<p>...</p>";
let str = `<table class="table table-dark table-striped">`;

str +=  `<thead><td>Name</td><td>Email</td><td>Delete</td></thead><tbody>`;

for (let ii = 0; ii < data.length; ii++) {

str+= "<tr>";

str+= "<td>";
str+= `${data[ii].id}: ${data[ii].name}`;
str+= "</td>";

str+= "<td>";
str+= data[ii].email;
str+= "</td>";

str+= "<td>";


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
                //console.log(response);
                populateOne();
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


