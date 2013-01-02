
/*
 * GET home page.
 */

exports.routes = function(app) {
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

