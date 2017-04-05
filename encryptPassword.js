const crypto = require('crypto')
const fs = require('fs')
const github = 'https://github.com/lumodon/tweet-regenerator.git'

const password = process.argv[2]
const {KEY_FILE, CRYPT_PASSWORD_FILE} = require('./config.js')

console.log(`your password is: ${password}`)

new Promise((resolve, reject) => {
  fs.readFile(CRYPT_PASSWORD_FILE, 'utf-8', (err, data) => {
    if(err) {
      reject(err)
    } else {
      resolve(data.match(/\=(.*)/)[1])
    }
  })
})
.then(HARDCODED_PASSWORD => {
  let crypted = encrypt(password, HARDCODED_PASSWORD)
  fs.writeFile(KEY_FILE, crypted, err => {
    if(err) {
      console.error(err)
    } else {
      console.log(`\nSuccessfully written encrypted password.
        You may now run 'npm start'
      `)
    }
  })
})
.catch(err => {
  console.log(`error: ${err}\n
    Did you download the config.cfg file from github?
    Try typing this line:
    pwd | awk '{print $NF}' FS=/ | tr -d '\n' | pbcopy && cd .. && rm -rf \`pbpaste\` && git clone ${github}
  `)
})


function encrypt(text, HARDCODED_PASSWORD){
  let cipher = crypto.createCipher('aes-256-ctr', HARDCODED_PASSWORD)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}