const http = require('http');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();
const body = fs.readFileSync('body.json', 'utf8');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/config',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});

req.write(body);
req.end();