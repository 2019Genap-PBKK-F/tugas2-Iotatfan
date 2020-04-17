const express = require("express")
const app = express()
const sql = require('mssql')
// const hostname = '10.199.14.46'
const hostname = '127.0.0.1'
const port = 8012

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *")
  next()
})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const config = {
    user: 'sa',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000067'
}

var executeQuery = function(res, query, model, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        model.forEach(function(m)
        {
          request.input(m.name, m.sqltype, m.value)
        })
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          // console.log(response.recordset)
          res.send(response.recordset)
          
        }
     })
    }
  })
}

//Data Dasar

app.get("/",function(req, res)
{
  // res.end('45 Butuh Pelukan')
  res.sendFile(__dirname + '/index.html')
})

app.get("/api/data-dasar/", function(req, res)
{
    var query = "select * from DataDasar"
    executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/nama", function(req, res)
{
  var query = 'select id,nama as name from DataDasar'
  executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/:id",function(req, res)
{
    var query = "select * from DataDasar where id=" + req.params.id
    executeQuery(res, query, null, 0)
})

app.post("/api/data-dasar/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )'
  executeQuery(res, query, model, 1)
})

app.put("/api/data-dasar/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = 'update DataDasar set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id'
  executeQuery(res, query, model, 1)
})

app.delete("/api/data-dasar/:id", function(req, res)
{
  var query = "delete from DataDasar where id=" + req.params.id
  executeQuery(res, query, null, 0)
})

//Jenis SatKer 

app.get("/api/jenis-satker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0)
})

app.post("/api/jenis-satker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date ))'
  executeQuery(res, query, model, 1)
})

app.put("/api/jenis-satker/:id", function(req, res)
{
  var model = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "update JenisSatker set nama = @nama, last_update = CURRENT_TIMESTAMP where id =" + req.params.id
  executeQuery(res, query, model, 1)
})

app.delete("/api/jenis-satker/:id", function(req, res)
{
  var query = "delete from Jenis_Satker where id =" + req.params.id
  executeQuery(res, query, null, 0)
})

//Periode

app.get("/api/periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0)
})

app.post("/api/periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "insert into Periode values ( @id, @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP"
  executeQuery(res, query, model, 1)
})

app.put("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update Periode set nama = @nama, last_update = CURRENT_TIMESTAMP where id =" + req.params.id
  executeQuery(res, query, model, 1)
})

app.delete("/api/periode/:id", function(req, res)
{
  var query = "delete from Periode where id =" + req.params.id
})

//Master Indikator

app.get("/api/master-indikator", function(req, res)
{
  var query = "select * from MasterIndikator"
  executeQuery(res, query, null, 0)
})

//Indikator Periode

app.get("/app/indikator-periode", function(req, res)
{
  var query = "select * from Indikator_Periode"
  executeQuery(res, query, null, 0)
})

//Capaian Unit

app.get("/api/capaian-unit/",function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0)
})

//Satuan Kerja

app.get("/api/satuan-kerja", function(req, res)
{
  var query = "select * from SatuanKerja"
  executeQuery(res, query, null, 0)
})

//Indikator Satuan Kerja

app.get("/api/indikator-satuan-kerja", function(req, res)
{
  var query = "select * form Indikator_SatuanKerja"
  executeQuery(res, query, null, 0)
})

//Log Indikator Satuan Kerja

app.get("/api/log-indikator-satker", function(req, res){
  var query = "select * from Indikator_SatuanKerja_Log"
  executeQuery(res, query, null, 0)
})

// POST FUNCTION



app.post("/api/capaian-unit/", function(req, res)
{
  var model = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    // { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Capaian_Unit values( @DataDasar_id, @Unit_id, CURRENT_TIMESTAMP, @capaian )'
  executeQuery(res, query, model, 1)
})

// PUT FUNCTION



app.put("/api/unit/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = 'update Unit set KategoriUnit_id = @KategoriUnit_id, nama = @nama where id = @id'
  executeQuery(res, query, model, 1)
})

app.put("/api/kategori/:id", function( req, res)
{
  var model = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]
  var query = 'update KategoriUnit set nama = @nama where id=' + req.params.id
  executeQuery(res, query, model, 1)
})

app.put("/api/capaian-unit/:DataDasar_id&:Unit_id", function(req, res) {
  var model = [
    { name: 'DataDasar_id_new', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id_new', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'update Capaian_Unit set DataDasar_id = @DataDasar_id_new, Unit_id = @Unit_id_new, waktu = CURRENT_TIMESTAMP, capaian = @capaian where DataDasar_id = ' + req.params.DataDasar_id + ' and Unit_id =' + req.params.Unit_id
  executeQuery(res, query, model, 1)
})

// DELETE FUNCTION




app.delete("/api/unit/:id", function(req, res)
{
  var query = "delete from Unit where id=" + req.params.id
  executeQuery(res, query, null, 0)
})

app.delete("/api/kategori/:id", function(req, res)
{
  var query = "delete from KategoriUnit where id=" + req.params.id
  executeQuery(res, query, null, 0)
})

app.delete("/api/capaian-unit/:DataDasar_id&:Unit_id", function(req, res)
{
  var query = "delete from Capaian_Unit where DataDasar_id=" + req.params.DataDasar_id + 'and Unit_id =' + req.params.Unit_id
  executeQuery(res, query, null, 0)
})

//  LISTEN

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port
  console.log(message)
})