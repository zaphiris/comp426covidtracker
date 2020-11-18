const express = require('express');
//const mongoose = require('mongoose');
//const bearerToken = require('express-bearer-token');

const port = process.env.PORT || 8080;

const app = express()

// mongoose.connect(`mongodb://localhost:27017/`)
//   .then(() => {
//     console.log('Connected to database');
//     app.listen(port, () => {
//       console.log(`Express server listening on port ${port}`);
//     });
//   });
