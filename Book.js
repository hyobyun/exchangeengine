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

    /**
     * @return returns true if order accepted.
     * returns false if order failed.
     * TODO: BETTER SYSTEM FOR MSGING ORDER FAILURES
     */
  addOrder(order) {
    var _this = this;
    if (order.side === Order.SIDE.BID) {
      // TODO: ORDER ERROR TYPES;
      if(this.lenAsks()==0 && order.type === OrderTypes.MARKET) {
        return false;
      }
      _this._bids.insert(order);

    } else if (order.side === Order.SIDE.ASK) {
      // TODO: ORDER ERROR TYPES;
      if(this.lenBids()==0 && order.type === OrderTypes.MARKET) {
        return false;
      }
      _this._asks.insert(order);

    }
    return true;
  }
  // FIFO
  // Simplify this: Split this up & make it more elegant
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
        var aggroOrder = null;
        var posLiqOrder = null;
        // One market , one limit on top.
        if (_this.peekAsk().type === OrderTypes.MARKET) {
          aggroOrder = _this._asks.extractMinimum().key;
          posLiqOrder = _this._bids.extractMinimum().key;
        } else if (_this.peekBid().type === OrderTypes.MARKET) {
          aggroOrder = _this._bids.extractMinimum().key;
          posLiqOrder = _this._asks.extractMinimum().key;
        }

        //if Both Limit and price match exists
        if (aggroOrder == null) {
          if (this.getSpread() < (config.deciAccuracy - config.deciAccuracy / 2)) {
            aggroOrder = _this._asks.extractMinimum().key;
            posLiqOrder = _this._bids.extractMinimum().key;
          } else {
            continue;
          }
        }

        // Two market orders should never collide since market ordrs are not allowed to exist on illiquid books


          var newOrders = [];
          var parentOrder= aggroOrder.quantity > posLiqOrder.quantity ? aggroOrder : posLiqOrder;
          var fillQuantity = Math.min(aggroOrder.quantity, posLiqOrder.quantity);
          var leftoverQuantity = Math.max(aggroOrder.quantity, posLiqOrder.quantity)-fillQuantity;


          var failed=[];
          if (leftoverQuantity > config.deciAccuracy) {
            let newOrder = Object.assign({}, parentOrder);
            newOrder.quantity = leftoverQuantity;
            newOrders.push(newOrder);
            var addRes = _this.addOrder(newOrder);
            if(!addRes) {
              failed.push(newOrder);
            }
          }

          trades.push(new Trade(posLiqOrder.price, fillQuantity, newOrders, [aggroOrder, posLiqOrder],failed, new Date()));
          // Add order to bookID
          tradeExecuted = true;
          continue;

      }
    }

    return trades;
  }

  getSpread() {
    return this.peekAsk().price - this.peekBid().price;
  }



}


module.exports = Book;
