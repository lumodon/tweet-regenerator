const express = require('express')
const pug = require('pug')
const path = require('path')
const mysql = require('mysql')
const oauth = require('oauth')
const consumer = require('./consumer')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

app.use(cookieParser())
app.use(session({ 
  secret: 'very secret',
  name: 'tweet_cookie',
  resave: true,
  saveUninitialized: true
}))

app.use('/session', require('./session'))
app.use('/twitter', require('./twitter'))

app.use((request, response, next) => {
  response.locals.user = request.session.user
  next()
})

app.get('/', (request, response) => {  
  response.render('index', {'username': process.env.USER})
})

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(204)
})

app.listen(3000)