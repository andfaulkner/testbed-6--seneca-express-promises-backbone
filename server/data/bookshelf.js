var logger = require('server/debug/winston-logger');
var log = logger.log('bookshelf.js');

log.info('in bookshelf!')

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'postgres',
    password : 'postgres',
    database : 'postgres',
    charset  : 'utf8',
    port: 5432
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;