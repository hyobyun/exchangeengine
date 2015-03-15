// Exchange Engine
// Hyo Yul Byun 2015


// ask sellers asking for

// Bid - buyers bidding

var BinaryHeap = require('./BinaryHeap.js');
var config = require('../config.js');

function Book() {
	this.bids = new BinaryHeap();
	this.asks = new BinaryHeap();
	this.matchAlgo = {};

	//Set default matching algorithm
	var defaultMatchAlgoName = config.defaultMatchAlgo;
	this.setMatchAlgo(defaultMatchAlgoName);
	if (this.matchAlgo instanceof Error) {
		return this.matchAlgo; //return error
	}
}

Book.prototype = {
	setMatchAlgo : function(matchAlgoName) {
		try {
			var matchAlgoLoad = require("./matchingAlgos/"+matchAlgoName+".js");
			this.matchAlgo = matchAlgoLoad;
			this.bids.comparator = matchAlgoLoad.comparator;
			this.asks.comparator = function(a,b) { return -1*matchAlgoLoad.comparator(a,b)};
		} catch (ex) {
			return new Error("Failed to load matching algorithm: " + ex);
		}
	},
	addOrder : function(order) {

		//Executes orders and returns orders to put back, If any
		var incompleteOrders = this.matchOrder(order);

		for (var i in incompleteOrders) {
			if(incompleteOrders[i].side==='a') {
				this.asks.insert(incompleteOrders[i]);
			} else if(incompleteOrders[i].side==='b') {
				this.bids.insert(incompleteOrders[i]);
			}
		}

	},

	removeOrder : function(order) {

	},

	matchOrder : function(agroOrder) {
		//Resting orders
		var rests = {};

		//Determine side of aggressor and set rests approporiately
		if (agroOrder.side=='a') {
			rests = this.bids;
		} else if (agroOrder.side=='b') {
			rests = this.asks;
		} else {
			return new Error("Aggressor order is not 'a' or 'b'");
		}


	//	if (rests.peek() == null) {
			//return null;
	//	} else {
			console.log("Rest Side: "  + (rests.peek() == null ? "N/A" : rests.peek().side));
			return this.matchAlgo.matchOrder(agroOrder,rests);
		//}
	}
}

module.exports = Book;
