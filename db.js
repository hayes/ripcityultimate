var settings = require('./knexfile')
var bookshelf = require('bookshelf')
var knex = require('knex')

module.exports = bookshelf(knex(settings.development))
