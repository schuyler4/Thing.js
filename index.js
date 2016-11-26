'use strict'

const http = require('http')
const fs = require('fs')

/* Thing starting varibles */
const Thing = {}
Thing.port = 4000
Thing.viewDir = './views'
Thing.routes = []
Thing.pageNotFound = '404.html'
Thing.serverError = '500.html'

/* render function returns an html file */
Thing.render = function(file) {
  fs.readFile('../views/' + file, function(err, file) {
    if(err) {
      throw err
    }

    return file
  })
}

/* the main function for the thing object */
Thing.listen = function() {

  /* the request handler */
  function requestHandler(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"})
    console.log(request.url)

    for(let i = 0; i < Thing.routes.length; i++) {

      if(request.url == Thing.routes[i].url) {

        if(Thing.routes[i].method == 'get') {
          console.log('the url is the same')
          Thing.routes[i].controller()
        }

        if(Thing.routes[i].method == 'post') {
          console.log('it is a post url')
        }

      } else {
        response.write('<h1> 404 page not found </h1>')
      }
    }

    response.write('hello')
    response.end()
  }

  /* listen to the server */
  const server = http.createServer(requestHandler)

  server.listen(this.port, function(err) {
    if(err) {
      throw err
    }

    console.log('listening on ' + Thing.port)
  })
  console.log('the server is listening on 3000')
}

module.exports = Thing
