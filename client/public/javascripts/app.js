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
  var Application, HomeView;

  HomeView = require('views/home_view');

  module.exports = Application = (function() {

    function Application() {}

    Application.prototype.initialize = function() {
      return this.homeView = new HomeView();
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

window.require.define({"models/collection": function(exports, require, module) {
  
  module.exports = Backbone.Collection.extend({});
  
}});

window.require.define({"models/model": function(exports, require, module) {
  
  module.exports = Backbone.Model.extend;
  
}});

window.require.define({"views/home_view": function(exports, require, module) {
  
  module.exports = Backbone.View.extend({
    el: '#main',
    template: require('views/templates/home'),
    events: {
      "click .form-submit": "get_new_video",
      "keypress input": "get_new_video"
    },
    initialize: function() {
      var _this = this;
      return $.ajax({
        url: "/video"
      }).done(function(videourl) {
        _this.data = {};
        _this.data.videourl = videourl;
        return _this.render();
      });
    },
    get_new_video: function(event) {
      var _this = this;
      if (event.keyCode === void 0 || event.keyCode === 13) {
        return $.ajax({
          type: "POST",
          url: "/getVideos",
          cache: false,
          data: {
            name: $(".name").val()
          },
          beforeSend: function() {},
          success: function(data) {
            _this.data = data;
            return _this.render();
          },
          error: function() {}
        });
      }
    },
    render: function() {
      if (this.data) {
        return $(this.el).html(this.template(this.data));
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
  buf.push('<div class="container"><div class="row main"><div class="hero-unit"><h1>Tchazzam!</h1><h2>Welcome, Brother.</h2><p>Name a song you\'d like to hear</p><input name="name" class="name"/><button class="btn-inverse form-submit">Search</button><div class="videodiv"><iframe');
  buf.push(attrs({ 'title':("Video Title"), 'height':("390"), 'width':("480"), 'frameborder':("0"), 'src':("" + (videourl) + "") }, {"title":true,"height":true,"width":true,"frameborder":true,"src":true}));
  buf.push('></iframe></div></div></div></div>');
  }
  return buf.join("");
  };
}});

