const express = require('express')
const pug = require('pug')
const path = require('path')
const createdb = require('./deleteme')

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'pug')
app.set('views', './views')
app.set('routes', './routes')

app.get('/', (request, response) => {
  console.log('running get')
  createdb( password => {
    data = {
      'password': password
    }
    response.render('index', data)
  })
})

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(204)
})

app.listen(3000)