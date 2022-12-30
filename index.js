import express  from 'express';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '13306',
  user: 'root',
  password: 'bils32611',
  database: 'bilzadb'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL');
  connection.query('SELECT * FROM bilzadb.users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

});


let con = null

const app = express()

// // respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

// app.get('/connect', function (req, res) {
//   con =  mysql.createConnection(mysqlConfig);
//   con.connect(function(err) {
//     if (err) throw err;
//     res.send('connected')
//   });
// })

// app.get('/create-table', function (req, res) {
//   con.connect(function(err) {
//     if (err) throw err;
//     const sql = `
//     CREATE TABLE IF NOT EXISTS numbers (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       number INT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )  ENGINE=INNODB;
//   `;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       res.send("numbers table created");
//     });
//   });
// })

// app.get('/insert', function (req, res) {
//   const number = Math.round(Math.random() * 100)
//   con.connect(function(err) {
//     if (err) throw err;
//     const sql = `INSERT INTO numbers (number) VALUES (${number})`
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       res.send(`${number} inserted into table`)
//     });
//   })
// })

app.get('/fetch', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM bilzadb.users`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.listen(3000)

console.log("listening on port 3000")

