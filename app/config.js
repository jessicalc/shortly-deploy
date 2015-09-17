var mongoose = require('mongoose'); 
var path = require('path');
// mongoose.connect(uri, options);


mongoose.connect('mongodb://127.0.0.1:27017/shortlydb');
mongoose.set('debug', true);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){ 
  // stuff will go in here once the connection is open! 
  // var userSchema = mongoose.Schema({
  //   username: String,
  //   password: String
  // });

  // var urlSchema = mongoose.Schema({
  //   url: String,
  //   base_url: String,
  //   code: String,
  //   title: String, 
  //   visits: Number 
  // })
  // var User = mongoose.model('User', userSchema);
  // var Link = mongoose.model('Link', urlSchema);

});

module.exports = db;



// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
