// server.js
require('dotenv').config(); // To load environment variables
const { connectDB } = require('./src/db');
const { fetchAndSaveCryptoData } = require('./src/job');
const app = require('./src/api');

// Connect to MongoDB
connectDB();

// Start background job immediately on server start
fetchAndSaveCryptoData();

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
