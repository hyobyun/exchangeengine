// Exchange Engine
// Hyo Yul Byun 2015

var BinaryHeap = require('./BinaryHeap.js');

function Book() {
	this.bids = new BinaryHeap();
	this.asks = new BinaryHeap();

	//Default Matching Algorithm is ProRata
	this.setMatchAlgo("ProRata")
}

Book.prototype = {
	setMatchAlgo : function(matchAlgo) {

	}
	addBid : function(order) {

	},
	addAsk : function(order) {

	},
	removeOrder : function(order) {

	}
}

module.exports = Book;
