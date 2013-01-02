HomeView = require('views/home_view')

module.exports = class Application
  initialize: ->
    @homeView = new HomeView()

  render: ->
    @homeView.render()
