const oauth = require('oauth')
const {twitterConsumerKey, twitterConsumerSecret} = require('./consumerKeys.js')

// let exportObj
// if(/dev/.test(process.env.NODE_ENV)) {
//   let oauthAccessToken = '752252909803278336-KYSQqfApP3dQkMgF8zFmOPsgPHRWgQ0'
//   let oauthAccessTokenSecret = 'e9Oq3nbojNKsUbAhUo6LdpW9Rb1nnR9lVKODrDhk5iHUk'
//   exportObj = {
//     getOAuthAccessToken: (requestToken, requestTokenSecret, verifier, callback) => {
//       callback(oauthAccessToken, oauthAccessTokenSecret)
//     }
//   }
// } else {
//   exportObj = 
// }
module.exports = new oauth.OAuth(
  'http://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  twitterConsumerKey, twitterConsumerSecret, '1.0A', 'http://127.0.0.1:3000/session/callback', 'HMAC-SHA1')

