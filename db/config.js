const path = require('path')

module.exports = {
  'KEY_FILE': path.join(__dirname, './mysql.keyfile'),
  'CRYPT_PASSWORD_FILE': path.join(__dirname, './crypt_password.cfg')
}