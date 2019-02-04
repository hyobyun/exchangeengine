var Order = require('./Order');
var Trade = require('./Trade');
var OrderTypes = require('./constants/orderTypes.js');
var FibonacciHeap = require('@tyriar/fibonacci-heap').FibonacciHeap;

var config = require('./config.js');
var async = require('async');

var bidComparator = function(a, b) {
  var ret = b.price - a.price;
  if (ret == 0) {
    ret = a.time - b.time;
  }
  return ret;
}
var askComparator = function(a, b) {
  var ret = a.price - b.price;
  if (ret == 0) {
    ret = a.time - b.time;
  }
  return ret;
}

class Book {
  constructor(name = "book") {
    this.name = name;


    // Buy orders
    this._bids = new FibonacciHeap(bidComparator);

    // Sell orders
    this._asks = new FibonacciHeap(askComparator);

  }

  lenBids() {
    return this._bids.size();
  }
  lenAsks() {
      return this._asks.size();
  }
  /**
   * @return returns the closest bid Order
   */
  peekBid() {
    return this._bids.findMinimum().key;
  }

  /**
   * @return returns the closest ask Order
   */
  peekAsk() {
    return this._asks.findMinimum().key;
  }

  /**
   * @return returns the ordered list of bids
   * WARNING: This is sub-optimally slow at nlogn. Potential for improvement, however,
   * this should not be used often.
   */
  bidsToArray() {
    var bids =[]
    var oldBids = this._bids;
    this._bids  = new FibonacciHeap(bidComparator);
    while(!oldBids.isEmpty()) {
      var bid = oldBids.extractMinimum().key;
      this._bids.insert(bid);
      bids.push(bid);
    }
    return bids;
  }

  /**
   * @return returns the ordered list of asks
   * WARNING: This is sub-optimally slow at nlogn. Potential for improvement, however,
   * this should not be used often.
   */
  asksToArray() {
    var asks =[]
    var oldAsks = this._asks;
    this._asks  = new FibonacciHeap(askComparator);
    while(!oldAsks.isEmpty()) {
      var ask = oldAsks.extractMinimum().key;
      this._asks.insert(ask);
      asks.push(ask);
    }
    return asks;
  }

  addOrder(order) {
    var _this = this;
    if (order.side === Order.SIDE.BID) {
      _this._bids.insert(order);
    } else if (order.side === Order.SIDE.ASK) {
      _this._asks.insert(order);
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

      if (_this._bids.size() === 0 || _this._asks.size()  === 0) {
        continue;
      } else {
        // One market , one limit on top.
        // TODO: BOTH MARKET
        var aggroOrder = null;
        var posLiqOrder = null;
        if (_this.peekAsk().type === OrderTypes.MARKET) {
          aggroOrder = _this._asks.extractMinimum().key;
          posLiqOrder = _this._bids.extractMinimum().key;
        } else if (_this.peekBid().type === OrderTypes.MARKET) {
          aggroOrder = _this._bids.extractMinimum().key;
          posLiqOrder = _this._asks.extractMinimum().key;
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
            var askLimOrder = _this._asks.extractMinimum().key;
            var bidLimOrder = _this._bids.extractMinimum().key;
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
    return this.peekAsk().price - this.peekBid().price;
  }



}


module.exports = Book;
