const mysql = require('mysql')
const getPassword = require('../helpers/getPassword')

getPassword( password => {
  let connection = mysql.createConnection({
    host              : 'localhost',
    user              : 'root',
    // getPassword       : password,
    database          : 'tweet_db',
    multipleStatements: true
  })

  connection.connect(err => {
    if(err) {
      console.error(err)
      return err
    }
    let query = `DROP TABLE IF EXISTS tweets;
      CREATE TABLE tweets (
      id int(11) NOT NULL AUTO_INCREMENT,
      tweetid BINARY(64),
      tweet VARCHAR(144),
      owner VARCHAR(20),
      PRIMARY KEY (id)
      ) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`
    connection.query(query, function (err, rows, fields) {
      if(err) {
        console.error(err)
      }
    })
    connection.end()
  })
})