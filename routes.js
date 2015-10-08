

var book = require('./book');
var trade = require('./trade');


module.exports= function(app) {
    app.use('/book', book);
        app.use('/trade', trade);
}
