var crypto = require('crypto')

module.exports.STORAGE_ACCOUNT = process.env.RIP_STORAGE_ACCOUNT || ''
module.exports.STORAGE_KEY = process.env.RIP_STORAGE_KEY || ''
module.exports.TWITTER_TOKEN = process.env.RIP_TWITTER_TOKEN || ''
module.exports.TWITTER_SECRET = process.env.RIP_TWITTER_SECRET || ''
module.exports.COOKIE_SECRET = process.env.RIP_COOKIE_SECRET || crypto.randomBytes(32).toString('hex')
