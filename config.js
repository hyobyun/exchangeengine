var MATCHALGOS = require('./constants/matchAlgos.js');
var config = {};


config.sessionSecret='changeme';
config.defaultMatchAlgo = MATCHALGOS.FIFO;
// Default matching algorithm used
config.defaultMatchAlgo = 1; // 1:FIFO
config.orderTypes = ['limit','market'];
config.deciAccuracy = 0.01;

config.port = 8888;

module.exports = config;
