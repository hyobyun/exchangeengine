// Exchange Engine
// Hyo Yul Byun 2015
var config = require('../../config.js');

var ProRata = {
  comparator : function(a, b){
    if(b.price > a.price) {
      return 1;
    }
    if(b.orderTime < a.orderTime) {
      return 1;
    }
  },
};

module.exports = ProRata;
