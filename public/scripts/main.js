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
    let databaseTweets = []
    let checkered = 'off'
    for(let tweet of listOfTweets) {
      databaseTweets.push({'id': tweet.id, 'msg': tweet.text})
      let singleTweetDiv = createElement('div', tweetsDiv, {
        'className': 'single-tweet checker-'+checkered,
      })
      checkered = checkered === 'off' ? 'on' : 'off'

      let leftSection = createElement('div', singleTweetDiv, {
        'className': 'leftSection',
      })

      let rightSection = createElement('div', singleTweetDiv, {
        'className': 'rightSection',
      })


      // Upper section
      let upperTweetSection = createElement('div', rightSection, {
        'className': 'upperTweet',
      })

      let retweetCheckbox = createElement('input', leftSection, {
        'className': 'timeContainer',
        'id': 'checkbox'+String(tweet.id),
        'type': 'checkbox',
      })
      retweetCheckbox.onchange = () => {
        updateRetweets({
          'id': retweetCheckbox.id, 
          'value': retweetCheckbox.checked
        })
      }

      let timeContainer = createElement('div', leftSection, {
        'className': 'timeContainer',
      })

      let inputHeader = createElement('p', timeContainer, {
        'className': 'inputHeader',
        'textContent': 'Hours to Retweet:'
      })

      let timeInput = createElement('input', timeContainer, {
        'className': 'timeInput',
        'id': 'timeInput'+String(tweet.id),
        'type': 'number',
        'min': '1',
        'max': '168',
        'width': '100px',
        'onblur': () => {
          if(timeInput.value < timeInput.min) {
            timeInput.value = timeInput.min
          } else if(timeInput.value > timeInput.max) {
            timeInput.value = timeInput.max
          }
        }
      })

      let tweetItself = createElement('p', upperTweetSection, {
        'textContent': tweet.text,
        'className': 'tweet'
      })

      // Lower section
      let lowerTweetSection = createElement('div', rightSection, {
        'className': 'lowerTweet',
      })

      let dateCreated = createElement('p', lowerTweetSection, {
        'className': 'dateCreated',
        'textContent': 'Date: '+tweet.date
      })

      let daysSince = createElement('p', lowerTweetSection, {
        'className': 'daysSince',
        'textContent': 'Posted '+tweet.daysSince+' days ago'
      })
    }
    fetch('//127.0.0.1:3000/db/storeTweets', {
      method: 'POST',
      body: JSON.stringify(databaseTweets)
    })
    .then(response => response.text())
    .then(response => {
      console.log('database store tweets response', response)
    })
  })
}

function createElement(type, parent, props) {
  let element = document.createElement(type)
  for(let key in props) {
    element[key] = props[key]
  }
  parent.appendChild(element)
  return element
}

function updateRetweets(tweetData) {
  fetch('//127.0.0.1:3000/twitter/updateRetweets', {  
    method: 'POST',
    body: JSON.stringify(tweetData)
  })
  .then(response => response.json())
  .then(response => {
    console.log('retweet response', response)
  })
}

window.onload = () => {
  console.log('document loaded')
  getTweets()
  console.log('document closing')
}