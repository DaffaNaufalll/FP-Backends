require('dotenv').config();

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

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Registration route (stub implementation)
app.post('/api/register', (req, res) => {
  // Example: log the incoming data and reply
  console.log('Register data:', req.body);
  res.json({ message: 'Register endpoint works!', data: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});