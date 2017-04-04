function encryptionHandling() {
  const crypto = require('crypto')
  const fs = require('fs')
  const {KEY_FILE, CRYPT_PASSWORD_FILE} = require('./config.js')
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
        resolve({'err':err})
      } else {
        resolve(data) // Capturing group as alternative to negative lookbehind, which javascript doesnt support
      }
    })
  })

  return Promise.all([
    getEncryptPassword,
    encryptFilekey
  ])
  .then(data => {
    if(data[1].hasOwnProperty('err')) {
      throw data[1].err
    } else {
      console.log('success reading keyfile data')
    }
    return decrypt(data[1])
  })
  .catch(err =>
    new Promise((resolve, reject) => {
      console.log('couldn\'t find key file, creating key')
      crypto.randomBytes(16, (err, buffer) => {
        if(err) {
          reject(err)
        }
        let key = buffer.toString('hex')

        fs.writeFile(KEY_FILE, encrypt(key), err => {
          if(err) {
            reject(err)
          } else {
            console.log('key file written')
          }
        })

        // Note that we are resolving out here because we could
        // care less about waiting for the file to finish being written
        resolve(key)
      })
    })
  )
  .then(decryptedKey => {
    console.log('your decrypted key is:', decryptedKey)
    return decryptedKey
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

function createDatabase() {
  const cp = require('child_process')

  encryptionHandling()
  .then(password => {
    cp.exec(`./createdb.sh ${password}`, (err, stdout, stderr) => {
      if(err) {
        throw err
      }
      if(stderr) {
        console.log(`
          stderr: ${stderr}
          You already have a mysql database. Do you still know your password?
          type 'npm run encrypt -- {your password here}`)
      } else {
        console.log(`
          Database created for user: ${USER-NAME} with password: ${password}\n
          keep your mysql.keyfile, this is an encrypted copy of your password.\n
          You may now run 'npm start'
        `)
      }
    })
  })
  .catch(err => {
    console.error('inner error from createDB function:', err, ':end inner error\n')
  })
}

createDatabase()