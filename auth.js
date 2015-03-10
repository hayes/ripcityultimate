var bell = require('bell')
var User = require('./models/user')
var env = require('./env')

module.exports = addAuth
module.exports.attributes = {name: 'auth'}

function addAuth(server, options, done) {
  server.register([require('hapi-auth-cookie'), bell], function (err) {
    if(err) {
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
          mode: 'try',
        },
        handler: function (request, reply) {
          if(!request.auth.isAuthenticated) return reply.redirect('/')
          return User.find(
            'twitter',
            request.auth.credentials.profile.id,
            function checked(err, account) {
              if(account) {
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
          )
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
