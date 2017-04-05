const crypto = require('crypto')
const fs = require('fs')
const {KEY_FILE, CRYPT_PASSWORD_FILE} = require('../config.js')


module.exports = function getPassword(callback) {
  let HARDCODED_PASSWORD
  const getEncryptPassword = new Promise((resolve, reject) => {
    fs.readFile(CRYPT_PASSWORD_FILE, 'utf-8', (err, data) => {
      if(err) {
        reject(err)
      } else {
        HARDCODED_PASSWORD = data.match(/\=(.*)/)[1]
        resolve()
      }
    })
  })
  
  const encryptFilekey = new Promise((resolve, reject) => {
    fs.readFile(KEY_FILE, 'utf-8', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

  return Promise.all([
    getEncryptPassword,
    encryptFilekey
  ])
  .then(data => {
    callback(decrypt(data[1]))
  })
  .catch(err => {
    console.error('major error here: ', err)
  })

  function encrypt(text){
    let cipher = crypto.createCipher('aes-256-ctr', HARDCODED_PASSWORD)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }
     
  function decrypt(text){
    let decipher = crypto.createDecipher('aes-256-ctr', HARDCODED_PASSWORD)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8')
    return dec
  }
}