// src/job.js
const cron = require('node-cron');
const { fetchCryptoData } = require('./utils');
const { saveCryptoData } = require('./db');

// Function to fetch and save data for Bitcoin, Matic, and Ethereum
const fetchAndSaveCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    const data = await fetchCryptoData(coins);
    for (let coin of coins) {
      const { usd: price, usd_market_cap: marketCap, usd_24h_change: change_24h } = data[coin];
      await saveCryptoData(coin, price, marketCap, change_24h);
    }
    console.log('Crypto data saved successfully');
  } catch (error) {
    console.error('Error fetching or saving crypto data:', error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndSaveCryptoData);

module.exports = { fetchAndSaveCryptoData };
