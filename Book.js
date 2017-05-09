var Order = require('./Order');
var async = require('async');

function Book(name) {


  this.name=name;


  // Buy orders
  this.bids = [];

  // Sell orders
  this.asks = [];

  // Atomic job queue
  var jobsQueue = async.queue(function(job, callback) {
      job(callback);
  }, 1);

  this.addOrder = function(order,callback) {
    var _this=this;
    var action = function(cb) {
      if (order.side===Order.SIDE.BID) {
        _this.bids.push(order);
        sortBids();
      } else if (order.side===Order.SIDE.ASK) {
        _this.asks.push(order);
        sortAsks();
      }
      cb();
      callback();
    }
    jobsQueue.push(action);
  }



  //Privates

  var sortBids = function() {
     var bidComparator = function(a,b) {
       var ret = b.price-a.price;
       if(ret==0) {
         ret = a.time-b.time;
       }
       return ret;
     }
     that.bids.sort(bidComparator);
  }

  var sortAsks = function() {
    var askComparator = function(a,b) {
      var ret = a.price-b.price;
      if(ret==0) {
        ret = a.time-b.time;
      }
      return ret;
    }

    that.asks.sort(askComparator);
  }


  var that = this;
}


module.exports = Book;
