[![Build Status](https://travis-ci.com/hyobyun/exchangeengine.svg?branch=master)](https://travis-ci.com/hyobyun/exchangeengine)
[![Coverage Status](https://coveralls.io/repos/github/hyobyun/exchangeengine/badge.svg?branch=master)](https://coveralls.io/github/hyobyun/exchangeengine?branch=master)
# Exchange Engine
An general purpose, stand alone, RESTful exchange engine written in Node.js.  Has the ability to support any number and type of order books and assets. The order matching algorithm is also configurable from the default FIFO algorithm.
## Work In Progress

## Dependencies
* Node.js + npm

## Installation
1. `git clone https://github.com/hyobyun/exchangeengine.git`
2. cd to the repository directory exchangeengine `cd exchangeengine`
3. `npm install`
4. Create config file: `cp config_template.js config.js`
5. Run it! `node index.js`

## Develop
### Unit test
`npm test`
