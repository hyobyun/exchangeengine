var path = require('path');
var express = require('express');
var passport = require('passport');
var log = require('winston');
var config = require('./config');

/* Create Express App */
var app = express();

/* Configure Logging */
require('./init/winston.js')();

/* Configure Mongoose */
require('./init/mongoose.js')();

/* Configure Express */
require('./init/express.js')(app);

/* Add Main route file  */
require('./routes')(app);


var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    log.info("Listening on HOST: " + host + " , PORT: " +port);
});
