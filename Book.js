var Order = require('./Order');
var Trade = require('./Trade');
var OrderTypes = require('./constants/orderTypes.js');
var FibonacciHeap=require('@tyriar/fibonacci-heap');

var config = require('./config.js');
var async = require('async');

class Book {
    constructor(name = "book") {
      this.name = name;

      // Buy orders
      this.bids = [];

      // Sell orders
      this.asks = [];

    }

      addOrder(order) {
        var _this = this;
        if (order.side === Order.SIDE.BID) {
          _this.bids.push(order);
          this.sortBids();
        } else if (order.side === Order.SIDE.ASK) {
          _this.asks.push(order);
          this.sortAsks();
        }
      }

      //FIFO
      // Split this up & make it more elegant
      settleBook() {
        var _this = this;
        var trades = [];
        // 0 liquidity on other side
        var i = 0;
        var tradeExecuted = true;
        while (tradeExecuted) {
          i++;
          tradeExecuted = false;

          if (_this.bids.length === 0 || _this.asks.length === 0) {
            continue;
          } else {
            // One market , one limit on top.
            // TODO: BOTH MARKET
            var aggroOrder = null;
            var posLiqOrder = null;
            if (_this.asks[0].type === OrderTypes.MARKET) {
              aggroOrder = _this.asks.shift();
              posLiqOrder = _this.bids.shift();
            } else if (_this.bids[0].type === OrderTypes.MARKET) {
              aggroOrder = _this.bids.shift();
              posLiqOrder = _this.asks.shift();
            }
            // Atleast one market order
            if (aggroOrder !== null) {
              var newOrders = [];
              var fillQuantity = Math.min(aggroOrder.quantity, posLiqOrder.quantity);
              if (Math.abs(aggroOrder.quantity - fillQuantity) > config.deciAccuracy) {
                let newOrder = Object.assign({}, aggroOrder);
                newOrder.quantity = aggroOrder.quantity - fillQuantity;
                newOrders.push(newOrder);
                _this.addOrder(newOrder);
              }
              if (Math.abs(posLiqOrder.quantity - fillQuantity) > config.deciAccuracy) {
                let newOrder = Object.assign({}, posLiqOrder);
                newOrder.quantity = posLiqOrder.quantity - fillQuantity;
                newOrders.push(newOrder);
                _this.addOrder(newOrder);
              }
              trades.push(new Trade(posLiqOrder.price, fillQuantity, newOrders, [aggroOrder, posLiqOrder], new Date()));
              // Add order to bookID
              tradeExecuted = true;
              continue;
            } else {
              // Both are limits
              if (this.getSpread() < (config.deciAccuracy - config.deciAccuracy / 2)) {
                var askLimOrder = _this.asks.shift();
                var bidLimOrder =_this.bids.shift();
                var newOrders = [];
                var fillQuantity = Math.min(askLimOrder.quantity, bidLimOrder.quantity);
                if (Math.abs(askLimOrder.quantity - fillQuantity) > config.deciAccuracy) {
                  let newOrder = Object.assign({}, askLimOrder);
                  newOrder.quantity = askLimOrder.quantity - fillQuantity;
                  newOrders.push(newOrder);
                  _this.addOrder(newOrder);
                }
                if (Math.abs(bidLimOrder.quantity - fillQuantity) > config.deciAccuracy) {
                  let newOrder = Object.assign({}, bidLimOrder);
                  newOrder.quantity = bidLimOrder.quantity - fillQuantity;
                  newOrders.push(newOrder);
                  _this.addOrder(newOrder);
                }
                trades.push(new Trade(askLimOrder.price, fillQuantity, newOrders, [bidLimOrder, askLimOrder], new Date()));
                // Add order to bookID
                tradeExecuted = true;
                continue;

              } else {
                continue;
              }
            }


          }
        }

        return trades;
      }

      getSpread() {
        return this.asks[0].price - this.bids[0].price;
      }

      // This method is pretty slow- use heap.
      sortBids() {
        var that=this;
        var bidComparator = function(a, b) {
          var ret = b.price - a.price;
          if (ret == 0) {
            ret = a.time - b.time;
          }
          return ret;
        }
        that.bids.sort(bidComparator);
      }

      sortAsks() {
        var that=this;
        var askComparator = function(a, b) {
          var ret = a.price - b.price;
          if (ret == 0) {
            ret = a.time - b.time;
          }
          return ret;
        }

        that.asks.sort(askComparator);
      }



}


module.exports = Book;
