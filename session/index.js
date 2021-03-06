const express = require('express')
const router = express.Router()
const oauth = require('oauth')
const consumer = require('../consumer')
const fs = require('fs')

router.get('/connect', (request, response) => {
  if(/dev/.test(process.env.NODE_ENV)) {
    response.redirect('http://127.0.0.1:3000/session/callback')
  } else {
    consumer.getOAuthRequestToken( (error, oauthToken, oauthTokenSecret, results) => {
      if(error) {
        console.log(error)
        response.status(500).send('Error getting OAuth request token : '+error)
      } else {
        request.session.oauthRequestToken = oauthToken
        request.session.oauthRequestTokenSecret = oauthTokenSecret
        fs.writeFile('./temp-oauth-fix.js', JSON.stringify({oauthRequestToken: request.session.oauthRequestToken, oauthRequestTokenSecret: request.session.oauthRequestTokenSecret}), err => {
          if(err) {
            console.log('error writing file')
          }
        })
        console.log('\nRequest*\ntoken:', request.session.oauthRequestToken, ', secret:', request.session.oauthRequestTokenSecret, ', verifier:', request.query.oauth_verifier)

        response.redirect('https://twitter.com/oauth/authorize?oauth_token='+request.session.oauthRequestToken)
      }
    })
  }
})

router.get('/callback', (request, response) => {
  if(/dev/.test(process.env.NODE_ENV)) {
    response.redirect('/twitter/page')
  } else {
    require('../helpers/getOAuth')(request)
    .then(() => {
      console.log('\nAccess*\ntoken:', request.session.oauthRequestToken, ', secret:', request.session.oauthRequestTokenSecret, ', verifier:', request.query.oauth_verifier)
      consumer.getOAuthAccessToken(
        request.session.oauthRequestToken, 
        request.session.oauthRequestTokenSecret, 
        request.query.oauth_verifier, 
        (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          console.log('\nerror: ', error, '\n\nresults: ', results)
          response.status(500).send('Error getting OAuth access token : ' + error + '['+oauthAccessToken+']'+ '['+oauthAccessTokenSecret+']'+ '['+results+']')
        } else {
          request.session.oauthAccessToken = oauthAccessToken
          request.session.oauthAccessTokenSecret = oauthAccessTokenSecret
          
          response.redirect('/twitter/page');
        }
      })
    })
  }
})

module.exports = router