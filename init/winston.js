var log = require('winston');

module.exports=function() {
    log.remove(log.transports.Console);
    log.add(log.transports.Console, {colorize:true});
}
