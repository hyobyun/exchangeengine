var config=require('../../config.js');
var path = require('path');
var orderTypes={};

config.orderTypes.map(function(orderTypeName) {
  orderTypes[orderTypeName] = require(path.join(__dirname,orderTypeName+'.js'));
});

module.exports=orderTypes;
