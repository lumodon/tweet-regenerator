# Team information

Team: `#fuzzy-spider`  
Team member: [Serafin Wesnidge, @lumodon](https://github.com/lumodon)  
JSDev link: [Tweet-reGenerator with Node.js](http://jsdev.learnersguild.org/goals/111-Tweet-reGenerator_with_Node.html)  

# Installation and setup

1. open terminal, navigate to a folder you store projects in.
2. type `echo $NODE_ENV`
3. if the response is `dev` or `development` type `export NODE_ENV=production`
4. else if the response was blank or anything else, move to step 5 without changing anything
5. type `git clone https://github.com/lumodon/tweet-regenerator.git`
6. install mysql with `brew install mysql` [if you do not have brew installed, click here and follow brew installation instructions](https://brew.sh/)
7. type `cd tweet-regenerator`
8. type `npm install`
9. type `npm run createdb`, if you get an errror, follow the error's instructions instead of moving to the next step.
10. else if you did *not* receive any errors, type `npm run migrate`
11. type `npm start`
12. using chrome browser, navigate to `localhost:3000`

the interface should be self-explanatory from there.
Have fun!

# tweet-regenerator

---
authors:
- "alfonsotech"
team_size: 1
goal_id: 111
title: Tweet-reGenerator with Node.js
created_at: '2016-12-04T00:57:52Z'
labels:
- practice
published: true
level: '1'
redirect_from: "/goals/111"
---

# Tweet-reGenerator with Node.js

## Challenge Rubric

This goal will likely be within your ZPD if you...

- Can build basic CRUD apps with Node.js and a SQL database
- Have a Twitter account and are familiar with basic Twitter concepts (like re-tweeting)
- Are interested in building full-stack web applications with frameworks like [Express][]
- Are interested in using a live web API

## Description

A web application that will allow the developer-user to collect their tweets and save them to a database of "evergreen" (not dated, always relevant) tweets. They will then be able to retweet tweets stored in said database either at regular intervals, or manually.

This Tweet-reGenerator is a Twitter-dedicated, light-weight clone of [MeetEdgar](https://meetedgar.com/), a social media management tool.

Building this app will require use of the [Twitter REST API][] with OAuth (meaning that you will need to get an API key from Twitter in order to access the API), JavaScript, [Node.js][node], [Express][], routing by way of [Routes.js][routes-js], the [MySQL][mysql] database, and a templating engine like [Pug][pug] or [Handlebars][].

_Note: this is only one suggested stack; you could also do it using express, PostgreSQL, pug (as many projects at the guild seem to do), or you could go the React/MongoDb way. Up to the developer team to decide what technologies to implement._

## Context

The life-span for a tweet is about 20 minutes, which means that most of your Twitter followers will not see your tweets the first time you post them. For this reason, re-tweeting your best content is a good idea.

This web app will allow you to grab and store your best, evergreen content tweets and re-tweet them to your followers. By keeping your Twitter followers better informed and entertained, you will organically grow your Twitter audience faster.

Developers/Learners will get practice working with Twitter's REST APIs on the backend; and with creating and working with a database on the backend (CRUD).

## Specifications

- [X] App uses the Twitter API.
- [ ] Users can view up to fifty of their most recent tweets from Twitter.
- [ ] When user sends out a tweet, it is automatically saved to the database for future access.
- [ ] Users can view their saved tweets (the ones in the database, not the ones from Twitter).
- [ ] Users automatically re-tweet saved tweets at a specified interval (on the hour, for example).
- [X] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

### Stretch

- [ ] After retrieving the first fifty tweets, users can retrieve and view the next fifty of their most recent tweets from Twitter. (The API allows developers to get up to 50 tweets at a time.)
- [ ] Users can re-tweet saved tweets at a specified time interval:
  - [ ] Immediately
  - [ ] At a specific time in the future
- [ ] Users can view which saved tweets have been re-tweeted and when.
- [ ] Users can edit saved tweets.
- [ ] Users can delete saved tweets.
- [ ] Users can search for and save another user's tweets by accessing and capturing their Twitter feed.
- [ ] Users can search for and save tweets by hashtag or search term.
- [ ] Users can organize saved tweets according to categories (use of filters).
- [ ] Users can Tweet out a randomly selected tweet from the database with a specificied category.

## Quality Rubric

- UI provides an attractive, intuitive user experience: 50 points.
- Code is readable and well organized: 50 points.

## Resources

- [Twitter REST API][twitter-rest-api]
- [Node.js][node]
- [Express][express]
- [Routes.js][routes-js]
- [MySQL][mysql]
- [Handlebars][handlebars]

[mit-license]: https://opensource.org/licenses/MIT

[twitter-rest-api]: https://dev.twitter.com/overview/api
[node]: https://nodejs.org/en/
[express]: http://expressjs.com/
[routes-js]: https://www.npmjs.com/package/routes-js
[mysql]: https://www.mysql.com/
[handlebars]: http://handlebarsjs.com/
