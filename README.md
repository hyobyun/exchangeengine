[![Build Status](https://travis-ci.com/hyobyun/exchangeengine.svg?branch=master)](https://travis-ci.com/hyobyun/exchangeengine)
[![Coverage Status](https://coveralls.io/repos/github/hyobyun/exchangeengine/badge.svg?branch=master)](https://coveralls.io/github/hyobyun/exchangeengine?branch=master)

# Exchange Engine
A general purpose exchange engine written in Node.js. Minimum functionality has been implemented, however, more features & documentation are planned.

## Current Implemented Features
- Limit Orders
- Market Orders
- FIFO Order Matching

## Benchmarking
The benchmarks below were done with a MPBr 2.3 GHz Intel Core with a randomized order adding and execution. See benchmark.js for more details. As expected, performance depends on how many limit orders are sitting in the books. I plan on publishing a more formal benchmark report later. A Transaction is a new limit or market order added to the book that may result in a trade.

| Book Size | Transactions/Second |
|-----------|---------------------|
| 100       | 219,257             |
| 500       | 56,879              |
| 1,000     | 26,894              |
| 10,000    | 2,171               |


## Dependencies
* Node.js + npm

## Installation
1. `git clone https://github.com/hyobyun/exchangeengine.git`
2. cd to the repository directory exchangeengine `cd exchangeengine`
3. `npm install`



### Unit test
`npm test`
