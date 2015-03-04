// Exchange Engine
// Hyo Yul Byun 2015

var BinaryHeap = require('./BinaryHeap.js');

function Book() {
	this.bids = new BinaryHeap();
	this.asks = new BinaryHeap();
}
module.exports = Book;