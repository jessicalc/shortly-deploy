var db = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
}, { collection: 'users' });

userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err); 
    user.password = hash;
    next();
  })
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
