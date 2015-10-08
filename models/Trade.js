var mongoose = require('mongoose');

var tradeSchema = new mongoose.Schema({
    book    : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    price   : String,
    side    : Boolean, // 0/false:sell 1/true:buy
    type    : Number,
});

module.exports = mongoose.model('Trade', tradeSchema);
