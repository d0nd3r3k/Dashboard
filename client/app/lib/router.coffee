module.exports = Backbone.Router.extend(
  routes:
    '': 'home'

  home: ->
    $('body').html @application.render()
)
