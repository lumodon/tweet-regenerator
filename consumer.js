const oauth = require('oauth')
let twitterConsumerKey = '9N6DSypJWQG45z0BhC1cOjWT9'
let twitterConsumerSecret = 'h7sXMkoRxRZw8xVlfxAxXNVDKq8recv90LxSzd1URUUwmHjlk8'

module.exports = new oauth.OAuth(
  'http://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  twitterConsumerKey, twitterConsumerSecret, '1.0A', 'http://127.0.0.1:3000/session/callback', 'HMAC-SHA1')

