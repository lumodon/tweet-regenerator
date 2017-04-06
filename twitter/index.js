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
        screenName = parsedData.screen_name
        
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
  client.get('statuses/user_timeline', {'q': screenName, 'count': 15}, function(error, tweets, twitterResponse) {
    if (!error) {
      let listOfTweetsObjs = []
      for(let tweet in tweets) {
        orderedInsert(listOfTweetsObjs, tweets[tweet])
      }
      console.log('listOfTweets', listOfTweetsObjs)
      response.send(listOfTweetsObjs)
    } else {
      console.log(error)
    }
  })
})

router.post('/updateRetweets', (request, response) => {
  console.log('updateRetweet body:', request.body)
  response.send('success')
})

function orderedInsert(arrayInsertInto, item) {
  let date = moment(item['created_at'], 'ddd MMM DD HH:mm:ss ZZ YYYY').format('MM/DD/YYYY HH:mm')
  let daysSince = Math.trunc((moment().diff(moment(date), 'days', true))*1000)/1000
  
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