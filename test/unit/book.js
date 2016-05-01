var assert = require('chai').assert;
var matchAlgos = require("../../constants/matchAlgos");
describe('Book', function(){

    it('Can create a new book with name', function() {
        var bookName= "testBook";

        var Book = require('../../models/Book.js');
        var test = new Book({name: bookName});
        assert.equal(test.name,bookName);
    });

    it('New Book default match algo is FIFO', function() {
        var Book = require('../../models/Book.js');
        var test = new Book({name: "testBook"});
        assert.equal(test.matchAlgo.length,1);
        assert.equal(test.matchAlgo[0],1)
    });

    it('New Book default allowed groups is 0', function() {
        var Book = require('../../models/Book.js');
        var test = new Book({name: "testBook"});
        assert.equal(test.allowedGroups.length,1);
        assert.equal(test.allowedGroups[0],0)
    });


})
