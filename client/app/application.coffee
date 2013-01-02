HomeView = require('views/home_view')
User = require 'models/users'

module.exports = class Application
  initialize: ->
    @homeView = new HomeView()
    @user = new User()

  render: ->
    @homeView.render()
