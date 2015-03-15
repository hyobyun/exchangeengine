//Currently for Testing
var Book = require('./orderBook/Book.js');
var Order = require('./orderBook/Order.js');

console.log('Exchange Engine Start');

var testBook = new Book();

//Generate random orders
for(var i=0;i<100;i++) {
  console.log("-------------------------");
  var tmpOrder = new Order();
  tmpOrder.price = Math.floor(Math.random()*10);
  tmpOrder.orderTime = new Date();
  tmpOrder.id=i;
  tmpOrder.quantity = Math.floor(Math.random()*100+1);
  if(Math.random()>=0.5)
    tmpOrder.side = 'a';
  else
    tmpOrder.side = 'b';



  console.log("Add SIDE:" +tmpOrder.side);
  console.log("Add Price:" +tmpOrder.price);
  console.log("      ");
  testBook.addOrder(tmpOrder);




  //Shit way to randomly delay
  for(var j=0;j<Math.random()*1000000000000 ; j++)
    1000000/j/j/j/j/j/j/j;


}


  console.log("-------BIDS------"+testBook.bids.length());
  console.log("price   | s ms   |  quantity")
  for(var j=0;0<testBook.bids.length();j++) {
    var orderTmp=testBook.bids.pop();
    console.log(orderTmp.price + "       | " +orderTmp.orderTime.getSeconds() + " " + orderTmp.orderTime.getMilliseconds()+ " | " +orderTmp.quantity);
  }

  console.log("-------ASKS------"+ testBook.asks.length());
  console.log("price   | s ms   | quantity")
  for(var j=0;0<testBook.asks.length();j++) {
    var orderTmp=testBook.asks.pop();
    console.log(orderTmp.price + "       | " +orderTmp.orderTime.getSeconds() + " " + orderTmp.orderTime.getMilliseconds() + " | " +orderTmp.quantity);
  }
