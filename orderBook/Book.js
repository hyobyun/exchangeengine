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
			var MatchAlgo = require("./matchingAlgos/"+config.defaultMatchAlgo+".js");
			// do stuff
		} catch (ex) {
			return new Error("Failed to load matching algorithm: " + matchAlgoName);
		}
	},
	addBid : function(order) {

	},
	addAsk : function(order) {

	},
	removeOrder : function(order) {

	}
}

module.exports = Book;
