// Créer un serveur web qui écoute sur le port 8080.

// const http = require('http');
import { createServer } from 'http'


createServer((request) => {
  console.log('====================================');
  console.log('server createed request : ', request);
  console.log('====================================');
}).listen(8080)

console.log('Server listening on http://localhost:8080')