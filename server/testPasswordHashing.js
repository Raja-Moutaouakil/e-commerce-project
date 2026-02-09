const bcrypt = require('bcryptjs');

// Example password to test
const password = 'new123'; // Replace this with the password you are testing
const hashedPassword = '$2b$10$jkOt.xWTXdIiYBP7WybPQOzymgypxUjzrlcU8QbkeJw7omHDZJCHm'; // Replace this with the hash from your database

// Compare the password with the hash
bcrypt.compare(password, hashedPassword, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    console.log('Password Valid:', result); // Should log true if the password matches
  }
});