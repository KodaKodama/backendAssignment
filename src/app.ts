const express = require('express');
const app = express();

const port = 1335;
app.listen(port, (err: any) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      console.log('app is running at', port);
    }
  });