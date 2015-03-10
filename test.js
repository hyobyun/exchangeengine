//Currently for Testing
var Book = require('./orderBook/Book.js');
var Order = require('./orderBook/Order.js');

console.log('Exchange Engine Start');

var testBook = new Book();

//Generate random orders
for(var i=0;i<50;i++) {
  var tmpOrder = new Order();
  tmpOrder.price = Math.floor(Math.random()*10);
  tmpOrder.orderTime = new Date();
  tmpOrder.id=i;
  tmpOrder.quantity = Math.floor(Math.random()*100+1);
  if(Math.random()>=0.5)
    tmpOrder.side = 'a';
  else
    tmpOrder.side = 'b';

  testBook.addOrder(tmpOrder);
  //console.log("  add " +tmpOrder.orderTime);
  //Shit way to randomly delay
  for(var j=0;j<Math.random()*10000000000 ; j++)
    1000000/j/j/j/j/j/j/j;

}


console.log("-------BIDS------"+testBook.bids.length());
console.log("price   | s ms   |  quantity")
for(var i=0;0<testBook.bids.length();i++) {
  var orderTmp=testBook.bids.pop();
  console.log(orderTmp.price + "       | " +orderTmp.orderTime.getSeconds() + " " + orderTmp.orderTime.getMilliseconds()+ " | " +orderTmp.quantity);
}

console.log("-------ASKS------"+ testBook.asks.length());
console.log("price   | s ms   | quantity")
for(var i=0;0<testBook.asks.length();i++) {
  var orderTmp=testBook.asks.pop();
  console.log(orderTmp.price + "       | " +orderTmp.orderTime.getSeconds() + " " + orderTmp.orderTime.getMilliseconds() + " | " +orderTmp.quantity);
}
