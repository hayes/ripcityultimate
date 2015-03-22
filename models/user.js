var joi = require('joi')
var db = require('../db')

module.exports = db.Model.extend({
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],
  initialize: function initialize() {
    this.on('saving', validate)
  }
})

var accountSchema = joi.object().keys({
  name: joi.string().min(1).max(255).trim(),
  email: joi.string().email().trim().max(255),
  auth_provider: joi.string().min(1).max(255),
  auth_token: joi.string().min(1).max(255),
  auth_secret: joi.string().min(1).max(255),
  auth_id: joi.string().min(1).max(255),
  created_at: joi.date(),
  updated_at: joi.date(),
  meta: joi.object()
}).requiredKeys(
  'name',
  'email',
  'auth_provider',
  'auth_token',
  'auth_secret',
  'auth_id',
  'meta',
  'created_at',
  'updated_at'
)

function validate() {
  joi.assert(this.toJSON(), accountSchema)
}
