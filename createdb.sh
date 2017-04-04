#!/bin/bash
mysql -u root -e "DROP DATABASE IF EXISTS tweet_db;"
mysql -u root -e "CREATE DATABASE tweet_db;"