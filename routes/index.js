
/*
 * GET home page.
 */

exports.routes = function(app) {
  app.get('/video', function(req, res) {
    res.send("http://www.youtube.com/embed/h7ArUgxtlJs");
  });

  app.get('/', function(req, res) {
    res.render('index', { videourl : 'http://www.youtube.com/embed/h7ArUgxtlJs'});
    console.log("hello, world");
  });

  app.post('/getVideos', function(req, res) {
    console.log("post request");
    var youtube = require('youtube-feeds');
    var string;
    youtube.feeds.videos( {q: req.param("name"), 'max-results': 2}, function(result) {
      console.log(result.items[0]);
      string = result.items[0].id;
      string.videourl = string;
      string = "http://www.youtube.com/embed/" + string;
      if(req.param("name")) {
        res.json({ videourl : string });
      } else {
        res.json({ videourl : string });
      }
    });
  });
};

