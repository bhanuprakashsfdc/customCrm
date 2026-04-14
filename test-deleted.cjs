const http = require('http');

// Login as admin
const loginReq = http.request({
  hostname: 'localhost',
  port: 3001,
  path: '/api/login',
  method: 'POST',
  headers: {'Content-Type': 'application/json'}
}, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const token = JSON.parse(data).token;
    
    // Create deleted user
    const createData = JSON.stringify({name: 'Deleted User', email: 'deleted@test.com', password: 'password123', role: 'User', status: 'Deleted'});
    const createReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(createData)
      }
    }, (res2) => {
      let data2 = '';
      res2.on('data', (c) => data2 += c);
      res2.on('end', () => {
        console.log('Created deleted user:', data2);
        
        // Now try to login with deleted user
        const loginData = JSON.stringify({email: 'deleted@test.com', password: 'password123'});
        const loginReq2 = http.request({
          hostname: 'localhost',
          port: 3001,
          path: '/api/login',
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData)}
        }, (res3) => {
          let data3 = '';
          res3.on('data', (c) => data3 += c);
          res3.on('end', () => {
            console.log('Login result:', data3);
          });
        });
        loginReq2.write(loginData);
        loginReq2.end();
      });
    });
    
    createReq.write(createData);
    createReq.end();
  });
});

loginReq.write(JSON.stringify({email: 'admin@test.com', password: 'admin123'}));
loginReq.end();