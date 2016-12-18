var thing = require('../index.js');

thing.routes = [
  {url: '/', method: 'get', controller: home},
  {url: '/', method: 'post', controller: getInput}
]

function home() {
  return './example/views/home.html'
}

function getInput() {
  console.log("get input")
}

thing.listen(3000)
