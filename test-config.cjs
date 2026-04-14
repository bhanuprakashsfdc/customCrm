const http = require('http');

const token = process.argv[2];
const body = process.argv[3] || '{}';

const postData = body;

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/config',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});

req.write(postData);
req.end();