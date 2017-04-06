const express = require('express')
const router = express.Router()
const oauth = require('oauth')
const consumer = require('../consumer')
const httpRequest = require('request')
const fs = require('fs')
const Twitter = require('twitter')
const {twitterConsumerKey, twitterConsumerSecret} = require('../consumerKeys')

let oauthAccessToken
let oauthAccessTokenSecret

router.get('/page', (request, response) => {
  consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", 
    request.session.oauthAccessToken, 
    request.session.oauthAccessTokenSecret, 
    (error, data, consumerResponse) => {
      if (error) {
        console.log('error =====>', error, '<==== end error')
        response.status(500).send("Error getting twitter screen name : " + error.data)
      } else {
        oauthAccessToken = request.session.oauthAccessToken
        oauthAccessTokenSecret = request.session.oauthAccessTokenSecret
        let parsedData = JSON.parse(data)
        
        response.render('twitter')
      }
    }
  )
})

router.get('/streamTweets', (request, response) => {
  let PATH = 'https://stream.twitter.com/1.1/statuses/sample.json'

  const client = new Twitter({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token_key: oauthAccessToken,
    access_token_secret: oauthAccessTokenSecret
  })
  const stream = client.stream('statuses/filter', {track: 'javascript'})
  stream.on('data', event => {
    console.log(event && event.text)
    response.send('value', event.text)
  })

  stream.on('error', error => {
    console.log('ERROR =====>', error, '<====== END ERROR')
  })
})

module.exports = router