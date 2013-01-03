
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
    var async = require('async');

    nconf.argv().env().file({
      file: "./config.json"
    });

    var options = nconf.get('github');

    fs = require('fs');
    /*
    var request = require('request');
    var org_url = "https://api.github.com/orgs/Lebanese-OSS/members"+ "?&per_page=100&client_id=" + options.client_id + "&client_secret=" + options.client_secret;

    users = [];

    get_user_info = function(member, callback){
      member_url = "https://api.github.com/users/"+ member.login + "?per_page=100&client_id=" + options.client_id + "&client_secret=" + options.client_secret;
      request(member_url, function(error, response, body) {
        user = JSON.parse(body);
        users.push(user);
        callback();
      });
    };

    request(org_url, function(error, response, body) {
      async.forEach(JSON.parse(body), get_user_info , function(err) {
        res.send(users); 
        fs.writeFile("users", JSON.stringify(users), function(err) {
            if(err) {
                    console.log(err);
                } else {
                        console.log("The file was saved!");
                    }
        }); 
      });
    });
    */
    var obj = JSON.parse(fs.readFileSync('users', 'utf8'));
    res.send(obj);
  });
};
