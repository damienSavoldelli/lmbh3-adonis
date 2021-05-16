import { createServer } from 'http'

createServer((request, response) => {
  // Répondre à /
  if(request.url === '/') {
    response.write('<h1>Page /</h1>');
    return response.end()
  }
  // Répondre à /about
  if(request.url === '/about') {
    response.write('<h1>Page /about</h1>');
    return response.end()
  }
  // Sinon 404
  // response.statusCode(404)
  response.writeHead(404) //TypeError: response.statusCode is not a function
  response.write('<h1>404 /</h1>');
  response.end()
}).listen(8080)

console.log('Server listening on http://localhost:8080')