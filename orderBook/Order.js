// Exchange Engine
// Hyo Yul Byun 2015

function Order() {
	this.id=null;
	this.ownerID = null;
	this.assetID = null;
	this.side = null;			//'a' or 'b'
	this.orderTime = null;
	this.orderType = null;
	this.price = null;
	this.quantity = null;
	this.orderStatus = null;
};
module.exports = Order;
