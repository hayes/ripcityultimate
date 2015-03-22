module.exports = init

function init(model) {
  return model.extend({
    tableName: 'settings'
  })
}
