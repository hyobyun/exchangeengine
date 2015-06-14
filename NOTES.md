



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

orderTypes
-agroWouldTradeSet(agroOrder, idleOrdersSet) : returns set of orders that it would trade with


matchingAlgos
-executeTrades(agroOrder) {           : returns executedOrders, new/partialOrders
  agroOrder's agroWouldTradeSet
  ....
}



----------------------------------------------------------------
