const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const theTblRouter = require("./routes/theTbl");
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////
app.use(express.json());
const logger = require("./middleware/logger");
//---setting up Middle ware 
app.use(cors());
app.use(express.urlencoded({  extended:false }));
//.. Route middlewares
app.use("",theTblRouter);
//.. static files
app.use(express.static(path.join(__dirname,"public")));
//.. Templating Engine
app.set("view engine" , "ejs");

app.use(logger);

/////////////////////////////////////
const posts = [
{ userId : 1, title : "post 1", content : "post 1 content" },
{ userId : 1, title : "post 2", content : "post 2 content" },
{ userId : 1, title : "post 3", content : "post 3 content" },
{ userId : 2, title : "post 4", content : "post 4 content" },
{ userId : 2, title : "post 5", content : "post 5 content" },
];

app.get('/posts', (req, res) => {
const body = req.body;
const accessToken = body.accessToken;
    jwt.verify(accessToken, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            console.log(err);
        }else {
        const userPosts = getPostsByUser( user.userId );
        res.json({userPosts,user});
        }
    });
});
//---------------------------------------
app.get('/login', (req, res) => {
const body = req.body;
const email = body.email;
const password = body.password;
const userId = 1; // This has to be obtained from the database
const user = {userId,email, password};

//---AUTHENTICATION
const accessToken = jwt.sign(user, process.env.JWT_TOKEN);

res.json({accessToken});
});

/////////////////////////////////////
function getPostsByUser(userId){
let userPosts = [];
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].userId ===  userId) {
        console.log(posts[i]);
        userPosts.push(posts[i]);
        }
    }
return userPosts;    
}
/////////////////////////////////////
app.listen(process.env.PORT_NUMBER);


