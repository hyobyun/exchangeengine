
var Book = require('./models/Book.js');
var Order = require('./models/Order.js');
var log = require('winston');

var ORDERTYPE= require('./constants/orderTypes.js');

var match = function(bookID, aggroOrder) {
    log.info("Finding Match for order: " + aggroOrder._id);

    if(aggroOrder.type == ORDERTYPE.LIMIT) {
        limitMatch(bookID,aggroOrder);
    } else if (aggroOrder.type == ORDERTYPE.MARKET) {
        marketMatch(bookID,aggroOrder);
    }
}


var limitMatch = function(bookID, aggroOrder) {
    /* If the aggro Order is selling look for prices greater than, else less than. */
    var priceSelector = {};
    priceSelector[ aggroOrder.side ? '$lte' : '$gte' ] = aggroOrder.price;

    /* 1: Ascending , -1 : Decending */
    var sortOrder = aggroOrder.side ? -1 : 1;
    var findRestPrice = Order.findOne({
            side: !aggroOrder.side,
            price: priceSelector,
            book: aggroOrder.book,
            status: 1
        }).
        sort({ price: sortOrder });

    findRestPrice.exec(function(err,restOrder) {
        log.info("Price find for aggro order : " + aggroOrder._id);
        if (restOrder) {
            /* There are valid trades to execute */
            var bestPrice = restOrder.price;
            var findRestOrders = Order.find({
                    side: !aggroOrder.side,
                    price: priceSelector,
                    book: aggroOrder.book,
                }).
                sort({ 'time':1});

            findRestOrders.exec(function(err,restOrders) {
                console.log(restOrders);
            });

        } else {
            log.info("No Approporiate matching resting orders for aggro order: " + aggroOrder._id)
        }
    });
}

var marketMatch = function(bookID, aggroOrder) {

}

module.exports=match;
