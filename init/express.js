var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var expresssession = require('express-session');
var config = require('../config.js');

module.exports=function(app) {

    /* Configure Express app */
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json())
    app.use(expresssession({ secret: config.sessionSecret ,resave: false, saveUninitialized: true}));

}
