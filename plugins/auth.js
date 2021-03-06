var bell = require('bell')
var env = require('../env')

module.exports = addAuth

function addAuth(server, options, done) {
  var User = server.plugins.bookshelf.model('User')
  server.register([require('hapi-auth-cookie'), bell], function registered(err) {
    if (err) {
      throw err
    }

    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: env.COOKIE_SECRET,
      clientId: env.TWITTER_TOKEN,
      clientSecret: env.TWITTER_SECRET,
      isSecure: false // need to fix this in prod
    })

    server.auth.strategy('session', 'cookie', 'try', {
      password: env.COOKIE_SECRET,
      cookie: 'sid',
      redirectTo: '/login',
      redirectOnTry: false,
      isSecure: false // fix me
    })

    server.route({
      method: ['GET', 'POST'],
      path: '/login',
      config: {
        auth: {
          strategy: 'twitter',
          mode: 'try'
        },
        handler: function handler(request, reply) {
          if (!request.auth.isAuthenticated) return reply.redirect('/')
          return new User().fetch({
            auth_id: request.auth.credentials.profile.id,
            auth_provider: 'twitter'
          }).exec(checked)

          function checked(err, account) {
            if (err) return reply(err)
            if (account) {
              request.auth.session.set({account: account})
              return reply.redirect('/')
            }

            var profile = {
              provider: 'twitter',
              token: request.auth.credentials.token,
              secret: request.auth.credentials.secret,
              id: request.auth.credentials.profile.id,
              name: request.auth.credentials.profile.raw.name
            }

            request.auth.session.set({tempProfile: profile})
            reply.redirect('/register')
          }
        }
      }
    })

    server.route({
      method: ['GET', 'POST'],
      path: '/logout',
      handler: function handler(request, reply) {
        request.auth.session.clear()
        reply.redirect('/')
      }
    })
  })

  done()
}
