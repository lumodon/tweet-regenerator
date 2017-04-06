const oauth = require('oauth')
const {twitterConsumerKey, twitterConsumerSecret} = require('./consumerKeys.js')

module.exports = new oauth.OAuth(
  'http://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  twitterConsumerKey, twitterConsumerSecret, '1.0A', 'http://127.0.0.1:3000/session/callback', 'HMAC-SHA1')

