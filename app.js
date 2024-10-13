const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS middleware for cross-origin requests

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(bodyParser.json());
app.use(cors());

// POST endpoint to receive product list and calculate total value
app.post('/calculate-total', (req, res) => {
  const products = req.body.products; // Get product list from request body

  // Check if the product list exists and is an array
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid product list' });
  }

  // Calculate total value
  let totalValue = 0;
  products.forEach(product => {
    const { price, quantity } = product;
    
    // Validate price and quantity
    if (typeof price === 'number' && typeof quantity === 'number') {
      totalValue += price * quantity;
    } else {
      return res.status(400).json({ error: 'Invalid product data' });
    }
  });

  // Return the total value
  return res.json({ totalValue });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
