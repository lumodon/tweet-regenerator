const express = require('express')
const router = express.Router()
const oauth = require('oauth')
const consumer = require('../consumer')

router.get('/connect', (request, response) => {
  consumer.getOAuthRequestToken( (error, oauthToken, oauthTokenSecret, results) => {
    if(error) {
      response.send('Error getting OAuth request token : '+error.message, 500)
    } else {
      request.session.oauthRequestToken = oauthToken
      request.session.oauthRequestTokenSecret = oauthTokenSecret
      response.redirect('https://twitter.com/oauth/authorize?oauth_token='+request.session.oauthRequestToken)
    }
  })
})

router.get('/callback', (request, response) => {
  consumer.getOAuthAccessToken(
    request.session.oauthRequestToken, 
    request.session.oauthRequestTokenSecret, 
    request.query.oauth_verifier, 
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
    if (error) {
      response.status(500).send('Error getting OAuth access token : ' + error + '['+oauthAccessToken+']'+ '['+oauthAccessTokenSecret+']'+ '['+results+']')
    } else {
      request.session.oauthAccessToken = oauthAccessToken
      request.session.oauthAccessTokenSecret = oauthAccessTokenSecret
      
      response.redirect('/twitter');
    }
  })
})

module.exports = router