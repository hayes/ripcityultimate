var joi = require('joi')

module.exports = init

var pageSchema = joi.object().keys({
  title: joi.string().min(1).max(255).trim(),
  slug: joi.string().min(1).max(255).trim(),
  body: joi.string(),
  author_id: joi.number().integer(),
  created_at: joi.date(),
  updated_at: joi.date()
}).requiredKeys(
  'title',
  'body',
  'created_at',
  'updated_at'
)

function validate() {
  joi.assert(this.toJSON(), pageSchema)
}

function init(model) {
  return model.extend({
    tableName: 'pages',
    hasTimestamps: ['created_at', 'updated_at'],
    initialize: function initialize() {
      this.on('saving', validate)
    },
    author: function author() {
      return this.belongsTo('User', 'author_id')
    }
  })
}
