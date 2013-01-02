
/*
 * GET home page.
 */

exports.routes = function(app) {
  app.get('/dashboard-stub', function(req, res) {
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
    res.render('index');
  });

  app.get('/dashboard', function(req, res) {
    var users = {};
    var nconf = require('nconf');
    nconf.argv().env().file({
      file: "./config.json.example"
    });

    var options = nconf.get('github');

    console.log(options.client_id + ' ' + options.client_secret);
    
    console.log('Getting Lebanese-OSS Users');
    var request = require('request');
    var org_url = "https://api.github.com/orgs/Lebanese-OSS"+ "&per_page=100&client_id=" + options.client_id + "&client_secret=" + options.client_secret;
    console.log(org_url);
    return request(org_url, function(error, response, body) {
      body.forEach(function(member){
        console.log('Getting Information For User: ' + member.login);
        member_url = "https://api.github.com/users/"+ member.login + "&per_page=100&client_id=" + options.client_id + "&client_secret=" + options.client_secret;
        return request(url, function(error, response, body) {
          console.log(body);
        });
      })
    });

    var github = new GitHubApi({
        version: "3.0.0"
    });

  });

};

