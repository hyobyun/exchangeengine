var assert = require('chai').assert;
var matchAlgos = require("../../constants/matchAlgos");
var orderStatus = require("../../constants/orderStatus");
var orderTypes = require("../../constants/orderTypes");

var Book = require('../../models/Book.js');
var Order = require('../../models/Order.js');

describe('Order', function(){

    it('Can create a new order', function() {
        var testBook = new Book({name: "testBook"});
        var order = new Order({
            book: testBook,
            quantity: 10,
            price: 11,
            side: 0,
            type: orderTypes.LIMIT,
            owner: 0
        });
        console.log(order);
    });

})
