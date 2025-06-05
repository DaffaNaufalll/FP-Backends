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

// Example User model (you should define this in a separate file)
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // In production, store hashed!
  role: String
});
const User = mongoose.model('User', userSchema);

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Registration route
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.create({ email, password, role });
    res.json({ message: 'User registered!', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }); // NOTE: In production, use password hashing!
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // In production, generate a JWT or session here
    res.json({ token: 'mock-token', role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});