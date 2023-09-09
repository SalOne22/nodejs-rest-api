require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

async function run() {
  const { DB_HOST, PORT = 3000 } = process.env;

  try {
    await mongoose.connect(DB_HOST);

    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

run();
