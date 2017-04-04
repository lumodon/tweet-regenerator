#!/bin/bash
MAINDB=${USER-NAME//[^a-zA-Z0-9]/_}
mysql -u root -e "CREATE DATABASE ${MAINDB} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -u root -e "CREATE USER ${MAINDB}@localhost IDENTIFIED BY '$1';"
mysql -u root -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"