const fs = require('fs')

module.exports = (request) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./temp-oauth-fix.js', 'utf-8', (err, data) => {
      if(err) {
        console.log('error reading from file')
        reject()
      } else {
        const parsedData = JSON.parse(data)
        request.session.oauthRequestTokenSecret = parsedData.oauthRequestTokenSecret
        request.session.oauthRequestToken = parsedData.oauthRequestToken
        console.log(request.session.oauthRequestToken, request.session.oauthRequestTokenSecret)
        resolve()
      }
    })
  })
}