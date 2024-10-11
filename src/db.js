// src/db.js
const mongoose = require('mongoose');

// Define the schema for storing crypto data
const cryptoSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change_24h: Number,
  fetchedAt: { type: Date, default: Date.now },
});

// Create the model
const Crypto = mongoose.model('Crypto', cryptoSchema);

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Function to save crypto data in the database
const saveCryptoData = async (coin, price, marketCap, change_24h) => {
  const cryptoData = new Crypto({ coin, price, marketCap, change_24h });
  await cryptoData.save();
};

// Function to get the latest crypto data for a specific coin
const getLatestCryptoData = async (coin) => {
  return await Crypto.findOne({ coin }).sort({ fetchedAt: -1 });
};

// src/db.js
const getLast100Prices = async (coin) => {
  const data = await Crypto.find({ coin }).sort({ fetchedAt: -1 }).limit(100).select('price');
  return data.map(item => item.price);
};

module.exports = { connectDB, saveCryptoData, getLatestCryptoData, getLast100Prices };
