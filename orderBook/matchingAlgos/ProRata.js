// Exchange Engine
// Hyo Yul Byun 2015
module.exports = {
  comparator : function(a, b){
    if(b.price > a.price) {
      return 1;
    } else if (b.price < a.price) {
      return -1;
    }

    if(b.orderTime < a.orderTime) {
      return 1;
    } else if (b.orderTime > a.orderTime) {
      return -1;
    }

    return 0
  }
};
