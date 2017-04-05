#!/bin/bash
MAINDB=${USER-NAME//[^a-zA-Z0-9]/_}
mysql -u root -e "DROP DATABASE IF EXISTS tweet_db;"
mysql -u root -e "CREATE DATABASE tweet_db;"
mysql -u root -e "CREATE USER `${MAINDB}`@'localhost' IDENTIFIED BY `$1`;"
mysql -u root -e "GRANT ALL PRIVILEGES ON tweet_db.* TO `${MAINDB}`@'localhost';"
mysql -u root -e "GRANT ALL ON mydb.* to `${MAINDB}`@'localhost' IDENTIFIED BY `$1`;"
mysql -u root -e "FLUSH PRIVILEGES;"