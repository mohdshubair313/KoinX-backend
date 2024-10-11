// src/api.js
const express = require('express');
const { getLatestCryptoData, getLast100Prices } = require('./db');
const { calculateStandardDeviation } = require('./utils');

const app = express();

// Existing endpoint for /stats
app.get('/stats', async (req, res) => {
  const { coin } = req.query;
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).send({ error: 'Invalid coin specified' });
  }

  try {
    const data = await getLatestCryptoData(coin);
    if (!data) {
      return res.status(404).send({ error: 'No data found' });
    }

    return res.json({
      price: data.price,
      marketCap: data.marketCap,
      '24hChange': data.change_24h,
    });
  } catch (error) {
    return res.status(500).send({ error: 'Error fetching data' });
  }
});

// New endpoint for /deviation
app.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).send({ error: 'Invalid coin specified' });
  }

  try {
    const prices = await getLast100Prices(coin);
    if (prices.length === 0) {
      return res.status(404).send({ error: 'No price data found' });
    }

    const deviation = calculateStandardDeviation(prices);
    return res.json({ deviation });
  } catch (error) {
    return res.status(500).send({ error: 'Error calculating deviation' });
  }
});

module.exports = app;
