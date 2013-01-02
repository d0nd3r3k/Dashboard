UserCollection= require 'models/users'

module.exports = Backbone.View.extend(
  el: '#main'
  template: require('views/templates/home')

  initialize: ->
    @data = {}

    @user_collection = new UserCollection
    @user_collection.fetch()
    @user_collection.on "reset", =>
      @data.users = []
      @user_collection.toJSON().forEach (x) =>
        @data.users.push x
      @render()

  render: ->
    if @data.users?
      $(@el).html @template(@data)
      $("#users").masonry
        itemSelector: '.user-container'
)
