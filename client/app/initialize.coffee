Router = require('lib/router')
Application = require 'application'

$ ->
  # Create the application
  app = new Application()
  app.initialize()

  # Create the router and pass it the app!
  router = new Router
  router.application = app

  Backbone.history.start()
