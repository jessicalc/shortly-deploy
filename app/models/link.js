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
  image_uri: String,
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