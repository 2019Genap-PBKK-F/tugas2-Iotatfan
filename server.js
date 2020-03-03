const express = require("express");
const app = express();
const hostname = '10.199.14.46';
// const hostname = '127.0.0.1';
const port = 8012;

const con = require("./connection/connection.js");

con.connect().then(pool => {
  return pool.request()
      .query('select * from mahasiswa')
}).then(res => {
  console.log(Object.values(res))
}).catch(err => {
  console.log(err)
})

app.get("/",function(request, response)
{
    response.json('45 Butuh Pelukan Wholesome');
});

app.listen(port, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});

console.log(`Server running at http://${hostname}:${port}/`);