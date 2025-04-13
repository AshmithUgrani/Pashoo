// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Middleware setup
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// All routes
const authRoutes = require('./src/users/user.route');
app.use('/api/auth', authRoutes);
const productRoutes = require('./src/products/products.route');  // Import the correct route file
app.use('/api/products', productRoutes); // Use the routes as middleware




// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB is successfully connected.');
  } catch (err) {
    console.log(err);
  }
}

main();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
