
/*
 * GET home page.
 */

exports.routes = function(app) {
  app.get('/dashboard', function(req, res) {
    users = [];
    user = {};
    user.name = "Piotr Yordanov";
    user.html_url = "https://github.com/tUrG0n";
    user.gravatar_id = "5a0a63261ea1f4a8b8204a0a993c3e0a";
    user.nickname = "tUrG0n";
    user.blog = "http://piotry.me";
    user.followers = 20;
    user.following = 20;
    user.stars = 500;
    users.push(user);

    user = {};
    user.name = "n00b";
    user.html_url = "https://github.com/tUrG0n";
    user.gravatar_id = "aa0a63261ea1f4a8b8204a0a993c3e0a";
    user.nickname = "r2a3";
    user.blog = "http://r2a3.com";
    users.push(user);

    res.send(users);
  });

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

