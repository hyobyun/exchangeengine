[![Circle CI](https://circleci.com/gh/hyobyun/exchangeengine.svg?style=shield)](https://circleci.com/gh/hyobyun/exchangeengine)

# Exchange Engine
An general purpose, stand alone, RESTful exchange engine written in Node.js.  Has the ability to support any number and type of order books and assets. The order matching algorithm is also configurable from the default FIFO algorithm.
## Work In Progress

## Dependencies
* Node.js + npm
* mongodb

## Installation
1. `git clone https://github.com/hyobyun/exchangeengine.git`
2. cd to the repository directory exchangeengine `cd exchangeengine`
3. `npm install`
4. Create config file: `cp config_template.js config.js`
5. At a minimum, configure your mongodb creds & uri in config.js `nano config.js`
6. Run it! `node index.js`

## Develop
### Unit test
`npm test`
