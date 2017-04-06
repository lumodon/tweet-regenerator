'use strict'

function getTweets() {
  fetch('//127.0.0.1:3000/twitter/streamTweets', {  
    method: 'GET',
  })
  .then(response => {
    return response.text()
  })
  .then(response => {
    let tweetsDiv = document.querySelector('#tweets')
    let listOfTweets = JSON.parse(response)
    for(let tweetIndex of listOfTweets) {
      let singleTweetDiv = document.createElement('div')
      singleTweetDiv.className = 'single-tweet'
      tweetsDiv.appendChild(singleTweetDiv)

      let retweetCheckbox = document.createElement('input')
      retweetCheckbox.className = 'checkbox'
      retweetCheckbox.id = 'checkbox'+String(tweetIndex.id)
      retweetCheckbox.type = 'checkbox'
      retweetCheckbox.onchange = updateRetweets.bind(retweetCheckbox, retweetCheckbox.id)
      singleTweetDiv.appendChild(retweetCheckbox)

      let timeContainer = document.createElement('div')
      timeContainer.className = 'timeContainer'
      singleTweetDiv.appendChild(timeContainer)

      let inputHeader = document.createElement('p')
      inputHeader.className = 'inputHeader'
      inputHeader.textContent = 'Hours to ReTweet:'
      timeContainer.appendChild(inputHeader)

      let timeInput = document.createElement('input')
      timeInput.className = 'timeInput'
      timeInput.id = 'timeInput'+String(tweetIndex.id)
      timeInput.type = 'number'
      timeInput.min = '1'
      timeInput.max = '168'
      timeInput.width = '100px'
      timeContainer.appendChild(timeInput)
      timeInput.onblur = () => {
        if(timeInput.value < timeInput.min) {
          timeInput.value = timeInput.min
        } else if(timeInput.value > timeInput.max) {
          timeInput.value = timeInput.max
        }
      }

      let tweet = document.createElement('p')
      tweet.textContent = tweetIndex.text
      tweet.className = 'tweet'
      singleTweetDiv.appendChild(tweet)
      
    }
  })
}

function updateRetweets(tweetId) {
  fetch('//127.0.0.1:3000/twitter/updateRetweets', {  
    method: 'POST',
    body: tweetId
  })
  .then(response => {
    return response.text()
  })
  .then(response => {
    console.log('retweet response', response)
  })
}

window.onload = () => {
  console.log('document loaded')
  getTweets()
  console.log('document closing')
}