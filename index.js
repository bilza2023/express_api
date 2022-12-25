const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const {remove,update,insert,listAll,pool} = require("./database/database");
const logger = require("./middleware/logger");

//---setting up Middle ware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({  extended:false }));


app.use(express.static(path.join(__dirname,"public")));
app.set("view engine" , "ejs");


app.use(logger);


app.post(
"/user/:name/:age" , 
    (req,res)=>{
    insert(req.params.name,req.params.age);
    console.log(req.params.name)
    listAll();
    }
);

app.post(
"/add" , 
    (req,res)=>{
    const body = req.body;
     insert(body.name,body.age);
    console.log("fron front end", req.body);
    }
);

app.patch(
"/patch" , 
    (req,res)=>{
    const body = req.body;
    update(body.id,body.name , body.age);
    console.log("fron front end", req.body);
    res.json( {success : "success" } );
    }
);
app.delete(
"/delete" , 
    (req,res)=>{
    const body = req.body;
    remove(body.id);
    // console.log("fron front end", req.body);
    res.json( {success : "success" } );
    }
);

app.get("/users" , async function(req,res) {

const promise= pool.promise()
var sql = "SELECT * FROM firstdb.users"
const [rows,field] = await promise.execute(sql)
res.json( 
        {
        details : "sucessful read", 
        data:rows
        });
console.log("new",rows);        
// res.send(rows);
});



app.get("/home" , (req,res)=>{
    // res.send("Hello World Alhamdullah");
    res.json( {message : "Stay Strong" } );
    // res.sendFile()
    // res.render("index" );
});


/////////////////////////////////////
/////////////////////////////////////
app.listen(process.env.PORT_NUMBER);