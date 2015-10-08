var mongoose = require('mongoose');
var config = require('../config.js');
var log = require('winston');

mongoose.connect(config.mongo.uri, {user:config.mongo.user , pass:config.mongo.pass});

module.exports=function() {
    mongoose.connection.on('open', function (ref) {
        connected=true;
        log.info('DB: Mongo DB Opened');
    });

    mongoose.connection.on('connected', function (ref) {
        connected=true;
        log.info('DB: connected to mongo server.');
    });

    mongoose.connection.on('disconnected', function (ref) {
        connected=false;
        log.warn('disconnected from mongo server.');
    });

    mongoose.connection.on('close', function (ref) {
        connected=false;
        log.warn('close connection to mongo server');
    });

    mongoose.connection.on('error', function (err) {
        connected=false;
        log.error('error connection to mongo server!');
        log.error(err);
    });

    mongoose.connection.db.on('reconnect', function (ref) {
        connected=true;
        log.warn('reconnect to mongo server.');
    });
}
