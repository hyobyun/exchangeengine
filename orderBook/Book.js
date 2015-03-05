// Exchange Engine
// Hyo Yul Byun 2015

var BinaryHeap = require('./BinaryHeap.js');
var config = require('../config.js')

function Book() {
	this.bids = new BinaryHeap();
	this.asks = new BinaryHeap();
	this.matchAlgo = {};

	//Set default matching algorithm
	var defaultMatchAlgoName = config.defaultMatchAlgo;
	this.matchAlgo = this.setMatchAlgo(defaultMatchAlgoName);
	if (this.matchAlgo instanceof Error) {
		return this.matchAlgo; //return error
	}
}

Book.prototype = {
	setMatchAlgo : function(matchAlgoName) {
		try {
			var matchAlgoLoad = require("./matchingAlgos/"+matchAlgoName+".js");
			this.bids.comparator = matchAlgoLoad.comparator;
			this.asks.comparator = matchAlgoLoad.comparator;
			console.log(this.bids.comparator);
		} catch (ex) {
			return new Error("Failed to load matching algorithm: " + ex);
		}
	},
	addBid : function(order) {
		this.asks.insert(order);
	},
	addAsk : function(order) {
		this.bids.insert(order);
	},
	removeOrder : function(order) {

	}
}

module.exports = Book;
