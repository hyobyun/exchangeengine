function Trade( price, quantity,newOrders, childOrders, rejectedOrders, time) {
  // TODO: VALIDATION
  this.fillPrice = price;
  this.fillQuantity = quantity;
  this.newOrders = newOrders;
  this.childOrders = childOrders;
  this.rejectedOrders = rejectedOrders;
  this.executionTime = time;
}

module.exports = Trade;
