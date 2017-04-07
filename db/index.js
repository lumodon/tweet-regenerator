const mysql = require('mysql')
const getPassword = require('../helpers/getPassword')
const router = require('express').Router()

let connection
getPassword( password => {
  console.log('decrypted password is: ', password)
  connection = mysql.createConnection({
    host               : 'localhost',
    user               : 'serafin',
    password           : password,
    database           : 'tweet_db',
    multipleStatements : true
  })
})

router.get('/', (request, response) => {
  connection.connect()
  connection.query('SELECT 1 + 1 AS solution;', function (err, rows, fields) {
    if (err){
      throw err
    }
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
})

router.post('/storeTweets', (request, response) => {
  let body = JSON.parse(request.body)
  let qs = ''
  for(let key in body) {
    let id = body[key]['id']
    let msg = body[key]['msg']
    qs += `INSERT INTO tweets (id, tweet) VALUES (${id} ${msg});\r\n`
  }
  console.log('Query string is: ', qs)

  connection.connect()
  connection.query(qs, function (err, rows, fields) {
    if (err){
      throw err
    }
  })
  connection.end()
  response.send('All stored')
})

router.get('/getTweets', (request, response) => {
  connection.connect()
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err){
      throw err
    }
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
  response.send('all tweets incoming')
})

router.post('/updateTweet', (request, response) => {
  console.log('database body', JSON.parse(request.body))
  connection.connect()
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err){
      throw err
    }
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
  response.send('updated')
})

module.exports = router