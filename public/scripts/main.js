'use strict'

function getTweets() {

  fetch('//127.0.0.1:3000/twitter/streamTweets', {  
    method: 'GET',
  })
  .then(response => {
    return response.text()
  })
  .then(response => {
    console.log('response is: ', response)
  })
}

window.onload = () => {
  console.log('document loaded')
  getTweets()
  console.log('document closing')
}