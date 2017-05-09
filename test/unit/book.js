var assert = require('chai').assert;
var async = require('async');


var Book = require('../../Book.js');
var Order = require('../../Order.js');

describe('Book', function(){

    it('Can create a new book with name', function() {
        var bookName= "testBook";
        var test = new Book(bookName);
        assert.equal(test.name,bookName);
    });

    it('Starts with zero length bid book', function() {
        var test = new Book("testBook");
        assert.equal(test.bids.length,0);
    });

    it('Starts with zero length ask book', function() {
        var test = new Book("testBook");
        assert.equal(test.asks.length,0);
    });




    it('bid order sorting is correct (pricing)', function(done) {
        var book = new Book("testBook");
        var o1= {
          quantity: 1,
          price: 1,
          side: Order.SIDE.BID,
          owner: "whome",
          status: Order.STATUS.ACTIVE,
          time: new Date()
        }
        var o2= {
          quantity: 1,
          price: 2,
          side: Order.SIDE.BID,
          owner: "whome",
          status: Order.STATUS.ACTIVE,
          time: new Date()
        }

        async.series([
          function(cb) {
            book.addOrder(o1,cb);
          },
          function(cb) {
            book.addOrder(o2,cb);
          }
        ],
        function(err, results) {
          assert.equal(book.bids[0].price,2);
          assert.equal(book.bids[1].price,1);
          done();
        });


    });

    it('ask order sorting is correct (pricing)', function(done) {
        var book = new Book("testBook");
        var o1= {
          quantity: 1,
          price: 2,
          side: Order.SIDE.ASK,
          owner: "whome",
          status: Order.STATUS.ACTIVE,
          time: new Date()
        }
        var o2= {
          quantity: 1,
          price: 1,
          side: Order.SIDE.ASK,
          owner: "whome",
          status: Order.STATUS.ACTIVE,
          time: new Date()
        }

        async.series([
          function(cb) {
            book.addOrder(o1,cb);
          },
          function(cb) {
            book.addOrder(o2,cb);
          }
        ],
        function(err, results) {
          assert.equal(book.asks[0].price,1);
          assert.equal(book.asks[1].price,2);
          done();
        });

    });

})
