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
app.set('views', './views')
app.set('/db', './db')

app.use(cookieParser())
app.use(session({ 
  secret: 'very secret',
  name: 'tweet_cookie',
  resave: true,
  saveUninitialized: true
}))

app.use('/session', require('./session'))
app.use('/db', require('./db'))

app.use((request, response, next) => {
  response.locals.user = request.session.user
  next()
})

app.get('/', (request, response) => {  
  response.render('index', {'username': process.env.USER})
})

app.get('/twitter', function(request, response){
  consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", 
    request.session.oauthAccessToken, 
    request.session.oauthAccessTokenSecret, 
    (error, data, consumerResponse) => {
      if (error) {
        response.status(500).send("Error getting twitter screen name : " + error.data)
      } else {
        let parsedData = JSON.parse(data)

        response.send('You are signed in: ' + parsedData.screen_name)
      } 
    }
  )
})

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(204)
})

function stringBuilder(stringSoFar, obj) {
  if(!stringSoFar) stringSoFar = ''
  if(typeof obj === 'object' && obj !== null) {
    for(let property in obj) {
      stringSoFar += '\nkey: '+property+', value: '+stringBuilder(stringSoFar, obj[property])
    }
  } else {
    stringSoFar += String(obj)
  }
  return stringSoFar
}

app.listen(3000)