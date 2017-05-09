function Book(name) {


  this.name=name;


  this.jobsQueue=[];

  //Buy orders
  this.bids = [];

  //Sell orders
  this.asks = [];
}

Book.addOrder= function(order) {
  var action = function() {
    this.bids.push(order);
  }
}




function sortBids() {

}

function sortAsks() {
  
}
module.exports = Book;
