var sql = require('mssql')

const config = new sql.ConnectionPool({
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000067'
});
console.log(config)

module.exports = config;