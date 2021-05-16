import fastify from 'fastify'

const server = fastify();

server.get('/', (request, response) => {
  return {foo: 'bar'}
});

server.listen('8080');

console.log('====================================');
console.log('listening on port 8080');
console.log('====================================');