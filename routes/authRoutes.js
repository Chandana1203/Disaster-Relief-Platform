// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Mock user data for simplicity (In a real-world app, you'd use a database)
let users = [];

// Route for registering a new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  // Add new user to the "database"
  users.push({ username, password });
  return res.status(201).json({ message: 'User registered successfully!' });
});

// Route for user login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  // In a real-world app, you would return a token (JWT, for example)
  return res.status(200).json({ message: 'Login successful!' });
});

// Export the router to use in other parts of the application
module.exports = router;
