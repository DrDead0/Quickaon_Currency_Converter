const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/currency', async (req, res) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const from = req.query.from || 'USD';
  const to = req.query.to || 'INR';
  const url = `https://open.er-api.com/v6/latest/${apiKey}?from=${from}&to=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
