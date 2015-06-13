



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
