module.exports = Backbone.View.extend(
  el: '#main'
  template: require('views/templates/home')
  events:
    "click .form-submit": "get_new_video"
    "keypress input": "get_new_video"

  initialize: ->
    $.ajax(
      url: "/video"
    ).done (videourl) =>
      @data = {}
      @data.videourl = videourl
      @render()

  get_new_video: (event)->
    if event.keyCode is undefined || event.keyCode == 13
      $.ajax
        type: "POST"
        url: "/getVideos"
        cache: false
        data: {
          name: $(".name").val()
        }
        beforeSend: ->
        success: (data) =>
          @data = data
          @render()
        error: ->

  render: ->
    if @data
      $(@el).html @template(@data)
)
