const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email, and password are required' });

  try {
    const normEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normEmail });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const isAdmin = process.env.ADMIN_EMAIL && normEmail === String(process.env.ADMIN_EMAIL).toLowerCase().trim();
    const user = await User.create({
      name: String(name).trim(),
      email: normEmail,
      password, // will be hashed by User pre-save hook
      role: isAdmin ? 'admin' : undefined,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const normEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normEmail });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Wrong password' });

    // Auto-promote admin by environment email, if configured
    const adminEmail = process.env.ADMIN_EMAIL && String(process.env.ADMIN_EMAIL).toLowerCase().trim();
    if (adminEmail && normEmail === adminEmail && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Return current authenticated user
router.get('/me', auth, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
