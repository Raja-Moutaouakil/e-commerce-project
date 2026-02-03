// server/controllers/authController.js

const bcrypt = require('bcryptjs');

// Example: hardcoded admin credentials (for demo only)
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10); // Use bcrypt to hash password

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email matches admin
  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    // Success: return a dummy token or user info
    return res.json({ message: 'Login successful', token: 'dummy-token', user: { email } });
  } else {
    // Failure
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};


;