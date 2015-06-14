var assert = require('chai').assert;
var config = require('../config.js');

describe('OrderTypes', function(){

    it('Should instantate with orderTypes in config.js', function(){
      var orderTypes = require('../orderBook/orderTypes');

      config.orderTypes.map(function(orderTypeName) {
        console.log(orderTypes[orderTypeName]);
        assert.ok(orderTypes[orderTypeName]);
      });
      
    });

})
