// src/utils.js
const axios = require('axios');

const fetchCryptoData = async (coins) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
};

// Function to calculate the standard deviation
const calculateStandardDeviation = (prices) => {
  const N = prices.length;
  const mean = prices.reduce((sum, price) => sum + price, 0) / N;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / N;
  return Math.sqrt(variance);
};

module.exports = { fetchCryptoData, calculateStandardDeviation };
