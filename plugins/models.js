var bookshelf = require('hapi-bookshelf-models')
var settings = require('../knexfile')

module.exports = addModels

function addModels(server, options, next) {
  server.register([{
    register: bookshelf,
    options: {
      knex: settings.development,
      plugins: ['registry'],
      models: './models'
    }
  }], next)
}
