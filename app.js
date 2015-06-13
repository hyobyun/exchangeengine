var Book = require('./orderBook/Book.js');
var redis= require('./redisClient.js');

var ee = {};

//callback(err,res)
ee.getNewBookID = function(callback) {
  redis.incr('bookID',callback);
}

module.exports=ee;
