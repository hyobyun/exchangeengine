var Book = require('./models/Book.js');
var Order = require('./models/Order.js');
var Trade = require('./models/Trade.js');
var log = require('winston');
var mongoose = require('mongoose');
var async = require('async');

var ORDERTYPE= require('./constants/orderTypes.js');


var execute = {};

/* Fifo order execution. either side will be traded until one runs out */
execute.fifo = function(aggroOrder, restingOrders) {

    async.doWhilst(function(callback) {
        var restOrder= restingOrders.shift();

        /* choose smaller quantity */
        var tradeQuantity = aggroOrder.quantity > restOrder.quantity ? restOrder.quantity : aggroOrder.quantity;

        var trade = new Trade();
        trade._id = new mongoose.Types.ObjectId;

        if(aggroOrder.side==0) {
            trade.sellOrder=aggroOrder._id;
            trade.buyOrder=restOrder._id;
        } else {
            trade.buyOrder=aggroOrder._id;
            trade.sellOrder=restOrder._id;
        }


        var newOrder;


        if(aggroOrder.quantity > restOrder.quantity ) {
            /* AggroOrder stays */
            newOrder = new Order(aggroOrder);
            newOrder._id = new mongoose.Types.ObjectId;
            newOrder.parentTrade = trade._id;
            newOrder.quantity=  aggroOrder.quantity-tradeQuantity;

            newOrder.save();
        } else if(aggroOrder.quantity < restOrder.quantity ) {
            /* restOrder stays */
            newOrder = new Order(restOrder);
            newOrder._id = new mongoose.Types.ObjectId;
            newOrder.parentTrade = trade._id;
            newOrder.quantity=  restOrder.quantity-tradeQuantity;

            newOrder.save();
        } else {

        }


        aggroOrder.childTrade=trade._id;
        restOrder.childTrade=trade._id;

        aggroOrder.status=0;
        restOrder.status=0;

        aggroOrder.save();
        restOrder.save();

    }, function test() {
        if (aggroOrder.quantity >0 && restingOrders.lenght>0 ) {
            return false;
        } else {
            return true;
        }
    }, function(err) {

    })
}

module.exports=execute;
