require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

async function run() {
  const { DB_HOST, PORT = 3000 } = process.env;

  await mongoose.connect(DB_HOST);

  app.listen(PORT, () => {
    console.log('Server running. Use our API on port: 3000');
  });
}

run();
