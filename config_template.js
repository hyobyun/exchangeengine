var MATCHALGOS = require('./constants/matchAlgos.js');
var config = {};

config.mongo= {
    uri: 'mongodb://localhost/myapp',
    user: 'username',
    pass: 'password',
}

config.sessionSecret='changeme';
// Default matching algorithm used
config.defaultMatchAlgo = MATCHALGOS.FIFO;
config.orderTypes = ['limit','market'];
config.deciAccuracy = 0.01;

config.port = 8888;

module.exports = config;
