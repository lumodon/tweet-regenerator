const express = require('express')
const router = express.Router()
const oauth = require('oauth')
const consumer = require('../consumer')
const httpRequest = require('request')
const fs = require('fs')
const Twitter = require('twitter')
const moment = require('moment')
const {twitterConsumerKey, twitterConsumerSecret} = require('../consumerKeys')

let oauthAccessToken
let oauthAccessTokenSecret
let screenName

if(/dev/.test(process.env.NODE_ENV)) {
  oauthAccessToken = '752252909803278336-KYSQqfApP3dQkMgF8zFmOPsgPHRWgQ0'
  oauthAccessTokenSecret = 'e9Oq3nbojNKsUbAhUo6LdpW9Rb1nnR9lVKODrDhk5iHUk'
}

router.get('/page', (request, response) => {
  (() => {
    if(/dev/.test(process.env.NODE_ENV)) {
      return new Promise((resolve, reject) => {
        request.session.oauthAccessToken = oauthAccessToken
        request.session.oauthAccessTokenSecret = oauthAccessTokenSecret
        resolve()
      })
    } else {
      return require('../helpers/getOAuth')(request)
    }
  })()
  .then(() => {
    console.log('token', request.session.oauthAccessToken,'secret', request.session.oauthAccessTokenSecret)
    consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", 
      oauthAccessToken, 
      oauthAccessTokenSecret, 
      (error, data, consumerResponse) => {
        if (error) {
          console.log('error =====>', error, '<==== end error')
          response.status(500).send("Error getting twitter screen name : " + error.data)
        } else {
          oauthAccessToken = request.session.oauthAccessToken
          oauthAccessTokenSecret = request.session.oauthAccessTokenSecret
          let parsedData = JSON.parse(data)
          screenName = parsedData.screen_name
          
          response.render('twitter')
        }
      }
    )
  })
})

router.get('/streamTweets', (request, response) => {
  let PATH = 'https://stream.twitter.com/1.1/statuses/sample.json'

  const client = new Twitter({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token_key: oauthAccessToken,
    access_token_secret: oauthAccessTokenSecret
  })
  console.log(oauthAccessToken, oauthAccessTokenSecret)
  client.get('statuses/user_timeline', {'q': screenName, 'count': 15}, function(error, tweets, twitterResponse) {
    if (!error) {
      let listOfTweetsObjs = []
      for(let tweet in tweets) {
        orderedInsert(listOfTweetsObjs, tweets[tweet])
      }
      response.send(listOfTweetsObjs)
    } else {
      console.log(error)
    }
  })
})

router.post('/updateRetweets', (request, response) => {
  let myValue = JSON.stringify(request.body)
  console.log('updateRetweet body:', myValue, typeof myValue)
  httpRequest({
    url: 'http://127.0.0.1:3000/db/updateTweet',
    method: 'POST',
    headers: {'Content-Type': 'text/plain'},
    body: myValue
  }, 
  (error, sbResponse, body) => {
    if(error) {
      console.log('ajax error', error)
      response.json({'error': error, 'sbResponse': sbResponse, 'body': body, 'test': 'Found me'})
    } else {
      console.log(request.body)
      response.json({
        'headers': sbResponse.headers,
        'body': request.body,
        'statusCode': sbResponse.statusCode,
        'httpVersion': sbResponse.httpVersion
      })
    }
  })
})

function orderedInsert(arrayInsertInto, item) {
  let date = String(moment(String(item['created_at']), 'ddd MMM DD HH:mm:ss ZZ YYYY').format('MM/DD/YYYY HH:mm'))
  let daysSince = Math.trunc((moment().diff(moment(String(date), 'MM/DD/YYYY HH:mm'), 'days', true))*1000)/1000
  
  let index = arrayInsertInto.findIndex( (element, i, arr) => {
    let next = (arr[i+1] !== undefined ? arr[i+1]['daysSince'] : null)
    if(!arr[i+1] && element.daysSince < daysSince) {
      return element
    }
    return element.daysSince < daysSince && 
    (arr[i+1]) && 
    (arr[i+1]).daysSince >= daysSince
  })

  arrayInsertInto.splice(index+1, 0, {
    'text': item['text'], 
    'id': item['id'],
    'date': date,
    'daysSince': daysSince
  })
}

module.exports = router