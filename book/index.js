var express = require('express');
var log = require('winston');
var router = express.Router();


var Book = require('../models/Book.js');

/* TODO: Split this up */

/* Get book listing */
router.get('/',function(req,res) {
    Book.find({},function(err,schools) {
         if (err) {
             log.error("Could not query books");
             res.status(500);
             res.json({error: "Could not query books"});
             log.error(err);
         } else {
             log.info('GET /book 200');
             res.json(schools);
         }

    });
});

/* Create new book */
router.post('/', function (req,res) {

        var name             = req.body.name;
        var matchAlgo        = req.body.matchAlgo;
        var allowedGroups    = req.body.allowedGroups;

        var newBook = new Book({
                name:name,
                matchAlgo:matchAlgo,
                allowedGroups:allowedGroups
              });

       newBook.save(function (err, newBook) {
            if (err) {
                log.error("Could not create Book");
                res.status(500);
                res.json({error: "Error has occured during school creation."});
                log.error(err);
            } else {
                log.info('POST /book 200 : ' + name);
                res.status(200);
                res.end();
            }
          });

    });

module.exports = router;
