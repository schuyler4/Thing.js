'use strict'

const thing = require('../index.js')
thing.listen()

thing.routes = [
  {url:'/', method: 'get', controller: hello},
  {url:'/this', method:'get', controller: hellothis}
]

function hello(request, response) {
  return console.log('hello')
}

function hellothis(request, response) {
  return console.log('this')
}
