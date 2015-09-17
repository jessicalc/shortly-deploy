var mongoose = require('mongoose'); 
var path = require('path');

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/shortlydb';
mongoose.connect(mongoUri);
mongoose.set('debug', true);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){  });

module.exports = db;

