require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Simple home route for testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Example protected route (you can replace with your own)
app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});