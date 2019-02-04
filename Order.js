function Order(quantity, price, side, time, owner, status) {
  this.quantity = quantity;
  this.price = price;
  this.side = side;
  this.owner = owner;
  this.status = status;
  this.time = time;
}

Order.STATUS = Object.freeze({
    ACTIVE:1
});
Order.SIDE = Object.freeze({
    BID:1,
    ASK:2
});

module.exports = Order;
