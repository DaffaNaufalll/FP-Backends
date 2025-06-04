const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');
const router = express.Router();

// Create ticket (protected)
router.post('/', auth, async (req, res) => {
  const { subject, description } = req.body;
  try {
    const ticket = new Ticket({
      user: req.user,
      subject,
      description
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get tickets for logged-in user (protected)
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;