var config = {};

config.mongo= {
    uri: 'mongodb://localhost/myapp',
    user: 'username',
    pass: 'password',
}

config.sessionSecret='changeme';
// Default matching algorithm used
config.defaultMatchAlgo = 1; // 1:ProRata
config.orderTypes = ['limit','market'];
config.deciAccuracy = 0.01;

config.port = 8888;

module.exports = config;
