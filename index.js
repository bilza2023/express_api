const express = require('express');

const app = express();

app.set("view engine" , "ejs");

app.get("/" , (req,res)=>{
    // res.send("Hello World Alhamdullah");
    // res.json( {message : "Stay Strong" } );
    res.render("index" );
});



app.listen(8080);