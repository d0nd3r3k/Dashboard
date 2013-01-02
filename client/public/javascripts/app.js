(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application, HomeView, User;

  HomeView = require('views/home_view');

  User = require('models/users');

  module.exports = Application = (function() {

    function Application() {}

    Application.prototype.initialize = function() {
      this.homeView = new HomeView();
      return this.user = new User();
    };

    Application.prototype.render = function() {
      return this.homeView.render();
    };

    return Application;

  })();
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application, Router;

  Router = require('lib/router');

  Application = require('application');

  $(function() {
    var app, router;
    app = new Application();
    app.initialize();
    router = new Router;
    router.application = app;
    return Backbone.history.start();
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'home'
    },
    home: function() {
      return $('body').html(this.application.render());
    }
  });
  
}});

window.require.define({"models/user": function(exports, require, module) {
  
  module.exports = Backbone.Model.extend({
    defaults: {
      name: '',
      website: ''
    }
  });
  
}});

window.require.define({"models/users": function(exports, require, module) {
  var User;

  User = require('models/user');

  module.exports = Backbone.Collection.extend({
    model: User,
    url: '/dashboard'
  });
  
}});

window.require.define({"views/home_view": function(exports, require, module) {
  var UserCollection;

  UserCollection = require('models/users');

  module.exports = Backbone.View.extend({
    el: '#main',
    template: require('views/templates/home'),
    initialize: function() {
      var _this = this;
      this.data = {};
      this.user_collection = new UserCollection;
      this.user_collection.fetch();
      return this.user_collection.on("reset", function() {
        _this.data.users = [];
        _this.user_collection.toJSON().forEach(function(x) {
          return _this.data.users.push(x);
        });
        return _this.render();
      });
    },
    render: function() {
      if (this.data.users != null) {
        $(this.el).html(this.template(this.data));
        return $("#users").masonry({
          itemSelector: '.user-container'
        });
      }
    }
  });
  
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="container"><div id="users" class="row-fluid">');
  // iterate users
  ;(function(){
    if ('number' == typeof users.length) {

      for (var $index = 0, $$l = users.length; $index < $$l; $index++) {
        var user = users[$index];

  buf.push('<div class="user-container"><img');
  buf.push(attrs({ 'src':("http://www.gravatar.com/avatar/" + (user.gravatar_id) + "?s=400") }, {"src":true}));
  buf.push('/><a');
  buf.push(attrs({ 'href':("" + (user.html_url) + "") }, {"href":true}));
  buf.push('><h4>' + escape((interp = user.name) == null ? '' : interp) + '</h4></a><p>( ' + escape((interp = user.nickname) == null ? '' : interp) + ' )</p><div class="blog"><a href="#{user.blog">' + escape((interp = user.blog) == null ? '' : interp) + '</a></div><div class="social"><div class="entry"><p>Followers</p><p>' + escape((interp = user.followers) == null ? '' : interp) + '</p></div><div class="entry"><p>Stars</p><p>' + escape((interp = user.stars) == null ? '' : interp) + '</p></div><div class="entry"><p>Following</p><p>' + escape((interp = user.following) == null ? '' : interp) + '</p></div></div></div>');
      }

    } else {
      var $$l = 0;
      for (var $index in users) {
        $$l++;      var user = users[$index];

  buf.push('<div class="user-container"><img');
  buf.push(attrs({ 'src':("http://www.gravatar.com/avatar/" + (user.gravatar_id) + "?s=400") }, {"src":true}));
  buf.push('/><a');
  buf.push(attrs({ 'href':("" + (user.html_url) + "") }, {"href":true}));
  buf.push('><h4>' + escape((interp = user.name) == null ? '' : interp) + '</h4></a><p>( ' + escape((interp = user.nickname) == null ? '' : interp) + ' )</p><div class="blog"><a href="#{user.blog">' + escape((interp = user.blog) == null ? '' : interp) + '</a></div><div class="social"><div class="entry"><p>Followers</p><p>' + escape((interp = user.followers) == null ? '' : interp) + '</p></div><div class="entry"><p>Stars</p><p>' + escape((interp = user.stars) == null ? '' : interp) + '</p></div><div class="entry"><p>Following</p><p>' + escape((interp = user.following) == null ? '' : interp) + '</p></div></div></div>');
      }

    }
  }).call(this);

  buf.push('</div></div>');
  }
  return buf.join("");
  };
}});

