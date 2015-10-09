var Book = require('./models/Book.js');
var Order = require('./models/Order.js');
var log = require('winston');
var async = require('async');

var ORDERTYPE= require('./constants/orderTypes.js');


var execute = {};

execute.fifo = function(aggroOrder, restingOrders) {
    var trades = [];
    async.doWhilst(function(callback) {

    }, function test() {

    }, function(err) {

    })
}

module.exports=execute;
