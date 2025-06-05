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

// Example User schema/model (ideally in a separate file)
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // NOTE: In production, store hashed passwords!
  role: String
});
const User = mongoose.model('User', userSchema);

// Root route for sanity check
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Registration route for creating users with role
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create({ email, password, role });
    res.json({ message: 'User registered!', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
});

// LOGIN ENDPOINT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // In production, compare hashed passwords!
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // In production, generate and return a real JWT token!
    res.json({ token: 'mock-token', role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});