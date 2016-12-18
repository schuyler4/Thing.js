'use strict'

const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')

/* Thing starting varibles */
const Thing = {}
Thing.viewDir = './example/views/'

/* how the routes are formated [{url: '/', method: 'get',
  controller: myController}] */
Thing.routes = []
Thing.pageNotFound = '404.html'
Thing.serverError = '500.html'

/* the main function for the thing object */
//param port the port to listen on
Thing.listen = function(port) {
  /* the request handler */
  function requestHandler(request, response) {

    for(let i = 0; i < Thing.routes.length; i++) {

      if(request.url == Thing.routes[i].url) {

        if(Thing.routes[i].method == 'get') {
          fs.readFile(Thing.routes[i].controller(), function(error, html) {
            if(error) {
              response.writeHead(500);
            }
            response.writeHeader(200, {"Content-Type": "text/html"})
            response.write(html, 'utf8')
            response.end()
          })

        }

        if(Thing.routes[i].method == 'post') {
          console.log('this is a post')
        }

      } else {
        response.write('<h1> 404 page not found </h1>')
      }
    }
  }

  /* listen to the server */
  const server = http.createServer(requestHandler)

  server.listen(port, function(err) {
    if(err) {
      throw err
    }

    console.log('listening on ' + port)
  })
}


module.exports = Thing
