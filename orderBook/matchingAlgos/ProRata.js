// Exchange Engine
// Hyo Yul Byun 2015

var config = require('../../config.js');


module.exports = {
  name: 'ProRata',
  comparator : function(a, b) {
    if(b.price > a.price) {
      return 1;
    } else if (b.price < a.price) {
      return -1;
    }

    if(b.orderTime < a.orderTime) {
      return 1;
    } else if (b.orderTime > a.orderTime) {
      return -1;
    }

    return 0;
  },

  // b ------- a
  matchOrder : function(agroOrder, restOrders) {

    //filledOrders will be returned later with the number of orders that are left.
    // This can include partially filled orders
    var filledOrders = [];
    var incompleteOrders = [];
    var agroSide = agroOrder.side;

    //Get best priced order(s)
    var bestPricedRestOrders = [];
    if (restOrders.peek() != null) {
      var bestRestPrice = restOrders.peek().price;
      do {
        bestPricedRestOrders.push(restOrders.pop());
        if (restOrders.peek() == null) {break;}
      } while (Math.abs(restOrders.peek().price-bestRestPrice) < config.deciAccuracy);
      console.log(bestPricedRestOrders);
    }

    //DOTO

    //Return orders not done filling
    if(agroOrder.quantity>0) {
      incompleteOrders.push(agroOrder);
    }

		for (var i in bestPricedRestOrders) {
      if(bestPricedRestOrders[i].quantity>0) {
        incompleteOrders.push(bestPricedRestOrders[i]);
      }
		}
    return incompleteOrders ;
  }
};
