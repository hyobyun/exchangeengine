var assert = require('chai').assert;
var ee = require('../app.js');


describe('App', function(){

    it('getNewBookID(callback) Should find new bookID', function(){
      ee.getNewBookID(function(err,res) {
        assert.isNumber(res);
      });
    });

})
