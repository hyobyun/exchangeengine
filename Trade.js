var mongoose = require('mongoose');

var tradeSchema = new mongoose.Schema({
    buyOrder    : { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    sellOrder    : { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
