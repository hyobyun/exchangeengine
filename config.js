var MATCHALGOS = require('./constants/matchAlgos.js');
var config = {};

config.mongo= {
    uri: 'mongodb://127.0.0.1/eetest',
    user: 'hyobyun',
    pass: 'zoomass4',
}
config.sessionSecret='changeme';
config.defaultMatchAlgo = MATCHALGOS.FIFO;
// Default matching algorithm used
config.defaultMatchAlgo = 1; // 1:ProRata
config.orderTypes = ['limit','market'];
config.deciAccuracy = 0.01;

config.port = 8888;

module.exports = config;
