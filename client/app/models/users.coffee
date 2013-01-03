User = require 'models/user'

module.exports = Backbone.Collection.extend
  model: User
  url: '/dashboard'
  comparator: (user) ->
    -user.get("public_repos")
