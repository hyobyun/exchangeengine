var express = require('express');
var log = require('winston');
var router = express.Router();


var Book = require('../models/Book.js');
var Trade = require('../models/Trade.js');

/* TODO: Split this up */

/* Get book listing */
router.get('/',function(req,res) {
    Trade.find({},function(err,trades) {
         if (err) {
             log.error("Could not query trades");
             res.status(500);
             res.json({error: "Could not query trades"});
             log.error(err);
         } else {
             log.info('GET /trades 200');
             res.json(trades);
         }

    });
});

/* Create new trade */
router.post('/', function (req,res) {

        var book             = req.body.book;
        var price            = Number(req.body.price);
        var side             = Boolean(req.body.side);
        var type             = Number(req.body.type);

        var newTrade = new Trade({
                book:book,
                price:price,
                side:side,
                type:type
              });

       newTrade.save(function (err, newTrade) {
            if (err) {
                log.error("Could not create Trade");
                res.status(500);
                res.json({error: "Error has occured during trade creation."});
                log.error(err);
            } else {
                log.info('POST /trade 200 : ' + newTrade);
                res.status(200);
                res.end();
            }
          });

    });

module.exports = router;
