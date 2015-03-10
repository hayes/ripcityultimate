var joi = require('joi')
var entGen = require('azure-storage').TableUtilities.entityGenerator

var db = require('../db')

exports.validate = validate
exports.create = create
exports.find = find

var accountSchema = joi.object().keys({
  name: joi.string().min(1).max(255).trim(),
  email: joi.string().email().trim().max(255),
  auth_provider: joi.string().min(1).max(255),
  auth_token: joi.string().min(1).max(255),
  auth_secret: joi.string().min(1).max(255),
  auth_id: joi.string().min(1).max(255),
  meta: joi.object(),
}).with(
  'name',
  'email',
  'auth_provider',
  'auth_token',
  'auth_secret',
  'auth_id',
  'meta'
)

function validate(account, done) {
  joi.validate(account, accountSchema, done)
}

function create(account, done) {
  var entry = {
    PartitionKey: entGen.String(account.auth_provider),
    RowKey: entGen.String(account.auth_id),
    email: entGen.String(account.email),
    name: entGen.String(account.name),
    auth_provider: entGen.String(account.auth_provider),
    auth_token: entGen.String(account.auth_token),
    auth_secret: entGen.String(account.auth_secret),
    auth_id: entGen.String(account.auth_id),
    meta: entGen.String(JSON.stringify(account.meta)),
    schema: entGen.Int32(1),
  }

  db.insertEntity('users', entry, done)
}

function find(provider, id, done) {
  db.retrieveEntity('users', provider, id, function found(err, data) {
    if (err) return done(err)

    done(null, {
      email: data.email._,
      name: data.name._,
      auth_provider: data.auth_provider._,
      auth_id: data.auth_id._,
      meta: JSON.parse(data.meta._)
    })
  })
}
