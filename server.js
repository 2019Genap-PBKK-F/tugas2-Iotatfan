const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = '10.199.14.46';
// const hostname = '127.0.0.1';
const port = 8012;


const config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000067'
};

// const con = require("./connection/connection");

var executeQuery = function(res, query) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
     })
    }
  })
}

app.get("/",function(req, res)
{
  res.end('45 Butuh Pelukan');
});

app.get("/api/mahasiswa", function(req, res)
{
  var query = "select * from mahasiswa";
  executeQuery(res, query);
});

app.post("/api/mahasiswa", function(req, res)
{
  var query = "insert into mahasiswa (nrp, nama, angkatan, lahir, ukt, foto, aktif) values(req.body.nrp, req.body.nama, req.body.angkatan, req.body.lahir, req.body.ukt, req.body.foto, req.body.aktif)";
  executeQuery(res, query)
})

app.listen(port, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});