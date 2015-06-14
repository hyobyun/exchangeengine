var Book = require('./orderBook/Book.js');
var redis= require('./redisClient.js');

var ee = {};

Book.getNewBookID(function(err,res) {
  console.log(res);
});

module.exports=ee;
