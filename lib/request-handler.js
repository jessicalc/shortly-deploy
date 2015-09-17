var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  var allLinks = {};

  Link.find({}, function(err, links) {
    res.send(200, links);
  });

};

exports.saveLink = function(req, res) {
  var uri = req.body.url;
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }; 
  Link.findOne({ url: uri }, function(err, link) {
    if (err) return handleError(err);
    if (link) {
      res.send(200, link);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        util.getImageUrl(uri, function(err, imageUrl) {
          console.log(imageUrl);
          if (err) {
            console.log('Error rendering image: ', err);
          }
          if (imageUrl === undefined) {
            imageUrl = null;
          } else if (imageUrl.charAt(1) === '/') {
            imageUrl = 'http:' + imageUrl;
          } else if (imageUrl.charAt(0) === '/') {
            imageUrl = uri + imageUrl;
          }
          var newLink = new Link({
            url: uri,
            title: title,
            base_url: req.headers.origin,
            image_uri: imageUrl || '/redirect_icon.png'
          });
          newLink.save(function(err, newLink) {
            if (err) return console.error(err);
            // Links.add(newLink);
            res.send(200, newLink);
          })
        })
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) return handleError(err);
    if (!user) {
      res.redirect('/login');
    } else {
      user.comparePassword(password, function(match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      })
    }
  })
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);

  User.findOne({ username: username }, function(err, person) {
    if (err) return handleError(err);
    if (!person) {
      var newUser = new User({
        username: username,
        password: password
      });
      newUser.save(function(err, newUser) {
        if (err) return console.error(err);
        util.createSession(req, res, newUser);
      })
    } else {
        console.log('Account already exists');
        res.redirect('/signup');
    }
  })
};

exports.navToLink = function(req, res) {
  var link = { code: req.params[0] };
  Link.findOne( { code: req.params[0] }, function(err, link) {
    if (err) return handleError(err);
    if (!link) {
      res.redirect('/');
    } else {
      link.visits = link.visits + 1;
      link.save(
        res.redirect(link.url)
      );
    }
  });
};