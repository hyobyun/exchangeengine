var assert = require('chai').assert;

describe('Main', function() {


  it('Import Module', function() {
    var ExchangeEngine = require('../../index.js');
  });

  it('Module includes book', function() {
    var ExchangeEngine = require('../../index.js');
    assert.exists(ExchangeEngine.Book);
  });
})
