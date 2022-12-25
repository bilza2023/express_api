const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const {insert,listAll,pool} = require("./database/database");
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

app.get("/users" , (req,res)=>{
   pool.query('SELECT * FROM firstdb.users', (err,result)=>{
    if (err) {
     console.log("panic",err)   
    }else {
        console.log("result",result);
        res.json( 
        {
        details : "sucessful read", 
        data:result
        });
    return result;
    }
   });
});
// app.get("/list" , (req,res)=>{
//     // insert(req.params.name,030);
//     console.log(req.params.name)
//     // res.render("index" );
// });
app.get("/home" , (req,res)=>{
    // res.send("Hello World Alhamdullah");
    res.json( {message : "Stay Strong" } );
    // res.sendFile()
    // res.render("index" );
});



app.listen(process.env.PORT_NUMBER);