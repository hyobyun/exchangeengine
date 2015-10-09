var express = require('express');
var log = require('winston');
var router = express.Router();

var match = require('../match.js');
var Book = require('../models/Book.js');
var Order = require('../models/Order.js');

/* TODO: Split this up */

/* Get book listing */
router.get('/',function(req,res) {
    Order.find({},function(err,orders) {
         if (err) {
             log.error("Could not query orders");
             res.status(500);
             res.json({error: "Could not query orders"});
             log.error(err);
         } else {
             log.info('GET /orders 200');
             res.json(orders);
         }

    });
});

/* Create new order */
router.post('/', function (req,res) {

        var book             = req.body.book;
        var price            = Number(req.body.price);
        var side             = Boolean(req.body.side);
        var type             = Number(req.body.type);
        var quantity         = Number(req.body.quantity);

        var newOrder = new Order({
                book:book,
                price:price,
                side:side,
                type:type,
                quantity:quantity
              });

       newOrder.save(function (err, newOrder) {
            if (err) {
                log.error("Could not create order");
                res.status(500);
                res.json({error: "Error has occured during order creation."});
                log.error(err);
            } else {
                log.info('POST /order 200 : ' + newOrder);
                res.status(200);
                res.end();

                match(book._id, newOrder);
            }
          });

    });

module.exports = router;
