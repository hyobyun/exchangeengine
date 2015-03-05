//Currently for Testing
var Book = require('./orderBook/Book.js');
var Order = require('./orderBook/Order.js');

console.log('Exchange Engine Start');

var testBook = new Book();
console.log(testBook);

//Generate random orders
var testOrders = [];
for(var i=0;i<30;i++) {
  var tmpOrder = new Order();
  tmpOrder.price = Math.random()*100;
  tmpOrder.orderTime = new Date();

  testOrders.push(tmpOrder);
  //console.log("  add " +tmpOrder.orderTime);
  //Shit way to randomly delay
  for(var j=0;j<Math.random()*100000000000 ; j++)
    1000000/j/j/j/j/j/j/j;

  if(Math.random()>.5)
    testBook.addBid(tmpOrder);
  else
    testBook.addAsk(tmpOrder);
}

for(i=0;i<testBook.asks.length();i++) {
  console.log(testBook.asks.pop().price);
}
