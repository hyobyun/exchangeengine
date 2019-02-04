var Book = require('./Book.js');
var Order = require('./Order.js');
var OrderTypes = require('./constants/orderTypes.js');
var t = new Date();
var start = new Date();
t.setSeconds(t.getSeconds() + 60);

//Generate random numbers
for (var i=1e6, lookupTable=[]; i--;) {
  lookupTable.push(Math.random());
}
function lookupRand() {
  return ++i >= lookupTable.length ? lookupTable[i=0] : lookupTable[i];
}


var samplePeriod=100000;

var count=0;
var trades=0;
var book = new Book("testBook");

while( Date.now() < t) {
  if(count%samplePeriod==0) {
    outputStats()
  }
  var o1 = {
    quantity: Math.floor(lookupRand()*100),
    price: lookupRand()*100,
    side: (lookupRand() >0.5 ? Order.SIDE.BID : Order.SIDE.ASK) ,
    type: (lookupRand() >0.5 ? OrderTypes.LIMIT :OrderTypes.MARKET),
    owner: "whome",
    status: Order.STATUS.ACTIVE,
    time: Date.now()
  }
  book.addOrder(o1);
  var ts = book.settleBook();
  count++;
  trades+=ts.length;
}
outputStats()
function outputStats() {
      var seconds=( Date.now()-start )/1000;
      console.log("");
      console.log("---------------------");
      console.log("Seconds  " + seconds);

      console.log("count/s  " + Math.floor(count/seconds));
      console.log("---------------------");
      console.log("count    " + count);
      console.log("trades   " + trades);
      console.log("asks     " + book.lenAsks());
      console.log("bids     "  + book.lenBids());
      console.log("");
}
