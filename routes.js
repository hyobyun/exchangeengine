

var book = require('./book');
var order = require('./order');


module.exports= function(app) {
    app.use('/book', book);
        app.use('/order', order);
}
