const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();


// const {remove,update,insert,pool} = require("./database/database");
const logger = require("./middleware/logger");
const theTblRouter = require("./routes/theTbl");


//---setting up Middle ware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({  extended:false }));


app.use(express.static(path.join(__dirname,"public")));
app.set("view engine" , "ejs");

app.use(logger);
//////////////////////////////////////////////////////
app.use("",theTblRouter);


/////////////////////////////////////
app.listen(process.env.PORT_NUMBER);