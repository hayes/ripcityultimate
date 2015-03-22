var models = require('./models')
var auth = require('./auth')
var register = require('./register')
var templates = require('./templates')
var routes = require('./routes')

module.exports = init

function init(server, done) {
  setup(server, [models, auth, register, templates, routes], done)
}

function setup(server, steps, done) {
  var last = steps.length - 1
  if (last < 0) return done()
  run(0)

  function run(i) {
    steps[i](server, null, function done(err) {
      next(err)
      next = function alreadyCalled() {
        throw new Error('step ' + i + ' called back multiple times')
      }
    })

    function next(err) {
      if (err) return finish(err)
      return i < last ? run(i + 1) : finish()
    }
  }

  function finish(err) {
    finish = function noop() {}
    done(err)
  }
}
