## Event Shuffle

> Eventshuffle is an application to help scheduling events with friends, quite like http://doodle.com/ but in a much simplified way. An event is created by posting a name and suitable dates to the backend, events can be queried from the backend and participants can submit dates suitable for them.

And this is a RESTful API, that enables that


[![CircleCI](https://circleci.com/gh/hollannikas/event-shuffle.svg?style=svg)](https://circleci.com/gh/hollannikas/event-shuffle)

### Running the server

A running version can be found on heroku at [https://event-shuffle.herokuapp.com](https://event-shuffle.herokuapp.com/api/v1/event/list)

If you have docker compose on your machine you can simply run `docker-compose up` and connect to port `8000`

Both versions (heroku and docker) use a [PostgreSQL](https://www.postgresql.org/) database

### API documentation

You can find the swagger documentation on heroku at [https://event-shuffle.herokuapp.com/documentation](https://event-shuffle.herokuapp.com/documentation).
The local swagger doc can of course be found on [http://localhost:8000/documentation](http://localhost:8000/documentation)

### Packages used

* [babel](https://github.com/babel/babel) for ES2015 fun
* [hapi](https://github.com/hapijs/hapi) seems like a sane server framework
* [joi](https://github.com/hapijs/joi) for data spec and validation
* [hapi-swagger](https://github.com/glennjones/hapi-swagger) hapi-swagger for OpenAPI documentation
* [Inert](https://github.com/hapijs/inert) to serve the swagger doc
* [Vision](https://github.com/hapijs/vision) to render the swagger doc
* [Boom](https://github.com/hapijs/boom) makes thrown errors readable
* [eslint](https://github.com/eslint/eslint) with [AirBnB's style guide](https://github.com/airbnb/javascript) to make 
sure things are readable and simple and to remind me to destructure ✨
* [Sequelize](https://github.com/sequelize/sequelize) as ORM, which I thought would save me time. Boy did it. NOT.
* [node-postgres](https://github.com/brianc/node-postgres) version 6, because of issue [#8463](https://github.com/sequelize/sequelize/issues/8463)
* [chai](https://github.com/chaijs/chai) for BDD style assertions
* [mocha](https://github.com/mochajs/mocha) test framework
* [nodemon](https://github.com/remy/nodemon) to restart node when I save

### TODO

* Add coverage report
* Option to use SQLite 3 when no `DATABASE_URL` is specified
* API tests (would use SQLite in stead of postgresql)
* Separate DB from model
