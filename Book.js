var Order = require('./Order');
var Trade = require('./Trade');
var OrderTypes = require('./constants/orderTypes.js');

var config = require('./config.js');
var async = require('async');

function Book(name) {

  this.name=name;

  // Buy orders
  this.bids = [];

  // Sell orders
  this.asks = [];

  this.addOrder = function(order) {
    var _this=this;
    if (order.side===Order.SIDE.BID) {
      _this.bids.push(order);
      sortBids();
    } else if (order.side===Order.SIDE.ASK) {
      _this.asks.push(order);
      sortAsks();
    }
  }

  //FIFO
  // Split this up & make it more elegant
  this.settleBook = function() {
    var _this=this;
    var trades=[];
    // 0 liquidity on other side
    var i=0;
    var tradeExecuted=true;
    while(tradeExecuted) {
      i++;
      tradeExecuted=false;

      if (_this.bids.length===0 || _this.asks.length===0) {
        continue;
      } else {
        // One market , one limit on top.
        // TODO: BOTH MARKET
        var aggroOrder = null;
        var posLiqOrder= null;
        if (_this.asks[0].type===OrderTypes.MARKET) {
          aggroOrder= _this.asks.shift();
          posLiqOrder= _this.bids.shift();
        } else if (_this.bids[0].type===OrderTypes.MARKET) {
          aggroOrder= _this.bids.shift();
          posLiqOrder= _this.asks.shift();
        }
        // Atleast one market order
        if (aggroOrder!==null) {
          var newOrders=[];
          var fillQuantity=Math.min(aggroOrder.quantity,posLiqOrder.quantity);
          if( Math.abs( aggroOrder.quantity -fillQuantity) > config.deciAccuracy) {
            let newOrder = Object.assign({}, aggroOrder);
            newOrder.quantity=aggroOrder.quantity - fillQuantity;
            newOrders.push(newOrder);
            _this.addOrder(newOrder);
          }
          if( Math.abs( posLiqOrder.quantity -fillQuantity) > config.deciAccuracy) {
            let newOrder = Object.assign({}, posLiqOrder);
            newOrder.quantity=posLiqOrder.quantity - fillQuantity;
            newOrders.push(newOrder);
            _this.addOrder(newOrder);
          }
          trades.push( new Trade(posLiqOrder.price, fillQuantity, newOrders,[aggroOrder,posLiqOrder],new Date()) );
          // Add order to bookID
          tradeExecuted=true; continue;
        } else {
          // Both are limits
          if( this.getSpread() < (config.deciAccuracy -config.deciAccuracy/2) ) {
            var olderLimOrder = null;
            var newerLimOrder= null;
            if (_this.asks[0].time< _this.bids[0].time) {
              olderLimOrder= _this.asks.shift();
              newerLimOrder= _this.bids.shift();
            } else {
              olderLimOrder= _this.bids.shift();
              newerLimOrder= _this.asks.shift();
            }
            var newOrders=[];
            var fillQuantity=Math.min(olderLimOrder.quantity,newerLimOrder.quantity);
            if( Math.abs( olderLimOrder.quantity -fillQuantity) > config.deciAccuracy) {
              let newOrder = Object.assign({}, olderLimOrder);
              newOrder.quantity=olderLimOrder.quantity - fillQuantity;
              newOrders.push(newOrder);
              _this.addOrder(newOrder);
            }
            if( Math.abs( newerLimOrder.quantity -fillQuantity) > config.deciAccuracy) {
              let newOrder = Object.assign({}, posLiqOrder);
              newOrder.quantity=newerLimOrder.quantity - fillQuantity;
              newOrders.push(newOrder);
              _this.addOrder(newOrder);
            }
            trades.push( new Trade(olderLimOrder.price, fillQuantity, newOrders,[newerLimOrder,olderLimOrder],new Date()) );
            // Add order to bookID
            tradeExecuted=true; continue;

          } else {
            continue;
          }
        }


      }
    }

    return trades;
  }

  this.getSpread = function() {
    return this.asks[0].price - this.bids[0].price;
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
