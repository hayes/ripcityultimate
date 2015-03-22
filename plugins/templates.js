var altr = require('altr')

module.exports = setup
module.exports.attributes = {name: 'templates'}

function setup(server, options, done) {
  server.views({
    engines: {
        html: {
          compileMode: 'sync',
          module: new Engine()
        }
    },
    relativeTo: __dirname,
    path: '../templates/',
    layout: true,
    partialsPath: '../templates/partials',
    helpersPath: '../templates/helpers',
    isCached: false
  })
  done()
}

function Engine() {
  this.helpers = {}
  this.compile = compile.bind(this)
  this.registerHelper = registerHelper.bind(this)
}

function compile(template) {
  try {
    var instance = altr(template, null, {
      sync: true,
      helpers: this.helpers
    })
  } catch(err) {
    return function onError() {
      return err.stack
    }
  }

  return function render(context) {
    instance.update(context)
    return instance.toString()
  }
}

function registerHelper(name, helper) {
  this.helpers[name] = helper
}
