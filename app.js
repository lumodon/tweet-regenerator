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
app.use('/db', require('./db'))

app.use((request, response, next) => {
  response.locals.user = request.session.user
  next()
})

app.get('/', (request, response) => {  
  response.render('index', {'username': process.env.USER})
})

app.get('/twitter', (request, response) => {
  // consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", 
  //   request.session.oauthAccessToken, 
  //   request.session.oauthAccessTokenSecret, 
  //   (error, data, consumerResponse) => {
  //     if (error) {
  //       console.log('error =====>', error)
  //       response.status(500).send("Error getting twitter screen name : " + error.data)
  //     } else {
  //      let parsedData = JSON.parse(data)
        
        response.render('twitter')
  //     }
  //   }
  // )
})

app.get('/stream', (request, response) => {
  response.setHeader('Content-Type', 'video/mp4')
  const fs = require('fs')
  try {
    const stream = fs.createReadStream('LoremIpsum.mp4')
    stream.on('data', data => {
      console.log('DATA\'ing:')
      response.write(data)
    })

    stream.on('end', () => {
      console.log('ENDING:', err)
      response.end()
    })
  } catch(err) {
    console.log('ERROR reading file:', err)
    stream.close()
    response.send(err)
  }
  console.log('End of Get route:')
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