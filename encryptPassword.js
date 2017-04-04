const crypto = require('crypto')
const fs = require('fs')

let password = process.argv[2]
console.log(`your password is: ${password}`)

let crypted = encrypt(password)
fs.writeFile(CONFIG_FILE, crypted, err => {
  if(err) {
    console.error(err)
  } else {
    console.log(`Successfully written encrypted password.\n
      You may now run 'npm start'
    `)
  }
})

function encrypt(text){
  let cipher = crypto.createCipher('aes-256-ctr', HARDCODED_PASSWORD)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}