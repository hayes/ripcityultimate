var azure = require('azure-storage')
var env = require('./env')

module.exports = azure.createTableService(env.STORAGE_ACCOUNT, env.STORAGE_KEY)

module.exports.createTableIfNotExists('users', function created(err) {
  if (err) throw err
})
