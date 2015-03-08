// Exchange Engine
// Hyo Yul Byun 2015
module.exports = {
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

    return 0
  },

  // b ------- a
  matchOrder : function(agroOrder, restOrders) {

    //filledOrders will be returned later with the number of orders that are left.
    // This can include partially filled orders
    var filledOrders = {};

    var agroSide = agroOrder.side;

    //Get best priced order
    //var peekRest = rest.
  }
};
