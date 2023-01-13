
const  {db,User,State} = require('./database/db.js');

app.get('/dbInsert', async (req, res) =>{


  await State.create({name : "Punjab"});
  await State.create({name : "Sind"});
  await State.create({name : "Balochistan"});
  await State.create({name : "Khyber-Pakhtunkhwa"});
  
   State.create({name : "Gilgit-Baltistan"})
   .then(() => console.log("done"));

res.status(200).json({"message": "DB Insert Success"});

});