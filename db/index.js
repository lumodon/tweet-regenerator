const mysql = require('mysql')
const getPassword = require('../helpers/getPassword')
const router = require('express').Router()

router.get('/db', (request, response) => {
  getPassword( password => {
    let connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'serafin',
      password : password,
      database : 'tweet_db'
    })
    connection.connect()
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
      if (err){
        throw err
      }
      console.log('The solution is: ', rows[0].solution)
    })
    connection.end()
  })
})

module.exports = router