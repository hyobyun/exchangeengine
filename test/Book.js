var assert = require('chai').assert;
var Book = require('../orderBook/Book.js');

describe('Book', function(){

    it('Should instantate with proper structure', function(){
      var book = new Book(1);
      assert.ok(book);
      assert.isFunction(book.addOrder);
      assert.isFunction(book.removeOrder);
      assert.isFunction(book.onMatch);
    });

    it('Should take in numbers or strings and set it as the id.', function() {
      var bookAlpha = new Book('abcd');
      assert.equal(bookAlpha.id,'abcd');
      var bookNum = new Book('1234');
      assert.equal(bookNum.id,'1234');
    });

    it('Should throw an error if it is not constructed with a number or string', function() {
      assert.throws(function() {
        new Book();
      });
      assert.throws(function() {
        new Book(function() {});
      });
      assert.throws(function() {
        new Book(new Book(1));
      });
    });

    it('getNewBookID(callback) Should find new bookID', function(){
      Book.getNewBookID(function(err,res) {
        assert.isNumber(res);
      });
    });
    it('Should default to ProRata', function(){
      var book=new Book(0);
      assert.equal(book.matchAlgo.name,'ProRata');
    });

})
