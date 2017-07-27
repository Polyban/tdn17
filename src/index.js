var Alexa = require('alexa-sdk')
var handlers = require('./handlers')

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback)
  alexa.appId = process.env.APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}
