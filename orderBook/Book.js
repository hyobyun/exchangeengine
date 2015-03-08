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
			this.asks.comparator = function(a,b) { return -1*matchAlgoLoad.comparator(a,b)};
			console.log(this.bids.comparator);
		} catch (ex) {
			return new Error("Failed to load matching algorithm: " + ex);
		}
	},
	addOrder : function(order) {
		if(order.side==='a') {
			this.asks.insert(order);
		} else if(order.side==='b') {
			this.bids.insert(order);
		}

	},

	removeOrder : function(order) {

	},

	matchOrder : function(agroOrder) {
		//Resting orders
		var rests = {};

		//Determine side of aggressor and set rests approporiately
		if (aggressor.side=='a') {
			rests = this.bids;
		} else if (aggressor.side=='b') {
			rests = this.bids;
		} else {
			return new Error("Aggressor order is not 'a' or 'b'");
		}

		return this.matchAlgo.matchOrder(agroOrder,rests);

	}
}

module.exports = Book;
