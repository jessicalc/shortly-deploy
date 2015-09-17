var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var urlSchema = mongoose.Schema({
  url: {
    type: String,
    unique: true
  },
  base_url: String,
  code: String,
  title: String, 
  visits: {
    type: Number,
    default: 0
  }
}, { collection: 'urls' });

urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  console.log(shasum);
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', urlSchema);

module.exports = Link;



var newLink = new Link({url: 'https://reddit.com', title: 'reddit', base_url: 'https://reddit.com'});
newLink.save(function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});