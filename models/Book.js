var mongoose = require('mongoose');
var log = require('winston');

var bookSchema = new mongoose.Schema({
    name   : String,
    matchAlgo :  {type: [ Number ], default: [1] },
    allowedGroups  : { type: [ Number ], default: [0] }
});

module.exports = mongoose.model('User', bookSchema);
