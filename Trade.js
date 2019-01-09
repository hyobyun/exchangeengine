function Trade( price, quantity,newOrders, childOrders, time) {
  // TODO: VALIDATION
  this.fillPrice = price;
  this.fillQuantity = quantity;
  this.newOrders = newOrders;
  this.childOrders = childOrders;
  this.executionTime = time;
}

module.exports = Trade;
