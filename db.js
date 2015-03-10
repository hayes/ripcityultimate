var azure = require('azure-storage')
var env = require('./env')

module.exports = azure.createTableService(env.STORAGE_ACCOUNT, env.STORAGE_KEY)
