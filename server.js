const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!');
});

server.listen(7777, () => {
  console.log('Server running on port 7777');
});

