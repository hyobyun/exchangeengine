
Side:
SELL: 0
BUY : 1

TYPE:
LIMIT : 1
MARKET :2


Orders  = HashSet
=======
incr ordersID

H: {ordersID}


Book   = Sorted sets
=======
incr bookID

bookID_ask
----------
score   : price

bookID_bid
----------
score   : price
contains orderIDs


--------------------------------------------------------------------------------


Book
-addOrder(agroOrder)
  -orderTradeSet=orderTypes.getOrderTradeSet(agroOrder,bookID);
  -tradeSet=getAlgoTradeSet(orderTradeSet);
  -executeTrades(orderType.executeTrades(tradeSet));


orderTypes
-getTradeSet(agroOrder,bookID) -> idleOrderTradeSet


-executeTrades(agroOrder) {           : returns executedOrders, new/partialOrders
  agroOrder's agroWouldTradeSet
  ....
}



----------------------------------------------------------------


orderType- returns
