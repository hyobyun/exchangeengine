// Exchange Engine
// Hyo Yul Byun 2015
var redis= require('../redisClient.js');

// ask sellers asking for

// Bid - buyers bidding

var BinaryHeap = require('./BinaryHeap.js');
var config = require('../config.js');


function Book(bookID) {
	var BookThis=this;
	if(bookID &&  (typeof bookID == 'string' || typeof bookID == 'number')) {
		this.id=bookID
	} else {
		throw new Error('bookID must be a string or number.');
	}
	return this;
}

Book.prototype = {
	setMatchAlgo : function(matchAlgoName) {
		console.log('k');
	},
	addOrder : function(order) {
		console.log('k');
	},

	removeOrder : function(order) {
		console.log('k');

	},

	onMatch : function(agroOrder) {
		console.log('k');

	}
}

module.exports = Book;
