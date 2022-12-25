
const btn = document.getElementById("btn");
btn.addEventListener("click" , ( )=> {
    fetch("http://localhost:8080/home")
    .then(response => response.json())
    .then(data => {
        const div = document.getElementById("msg");
        div.innerHTML = `<h1>${data.message}</h1>`
        console.log("data : " , data);
    });

    // console.log("index.html loaded");

});

const btnList = document.getElementById("usersBtn");
btnList.addEventListener("click" , ( )=> {
    fetch("http://localhost:8080/users")
    .then(response => response.json())
    .then(data => {
        const div = document.getElementById("usersListDiv");
        div.innerHTML = `<h1>${data.details}</h1>`;

        const div2 = document.getElementById("usersListDiv2");
        let txt = "<table>";
        txt += "<th>";
        txt += "<tr>";
        txt += "<td>ID</td>";
        txt += "<td>name</td>";
        txt += "<td>age</td>";
        txt += "</tr>";
        txt += "</th>";
            for (let i = 0; i < data.data.length; i++) {
                txt += `<tr>`;
                txt += `<td>${data.data[i].id}</td>`;
                txt += `<td>${data.data[i].name}</td>`;
                txt += `<td>${data.data[i].age}</td>`;
                txt += `</tr>`;
            }
        txt += "</table>"    
        div2.innerHTML = txt;
        
        console.log("data : " , data.data);
    });

    // console.log("index.html loaded");

});