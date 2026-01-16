const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const user = await User.create(req.body);

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token, user });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
});

module.exports = router;
