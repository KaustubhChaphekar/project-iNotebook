const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = { connectToMongo };