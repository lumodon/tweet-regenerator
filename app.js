const express = require('express')
const pug = require('pug')
const path = require('path')
const getPassword = require('./helpers/getPassword')
const mysql = require('mysql')

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'pug')
app.set('views', './views')
app.set('routes', './routes')

app.get('/', (request, response) => {  
  response.render('index', {'username': process.env.USER})
})

app.get('/db', (request, response) => {
  getPassword( password => {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      //password : password,
      database : 'tweet_db'
    });

    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
      if (err) throw err

      console.log('The solution is: ', rows[0].solution)
    })

    connection.end()
  })
})

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(204)
})

app.listen(3000)