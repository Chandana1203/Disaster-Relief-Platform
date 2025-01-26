const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDB } = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const PORT = process.env.PORT || 5000;

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON request bodies

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the database connection
initializeDB()
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the application if DB connection fails
  });

// Register the routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Disaster Relief Coordination Platform Backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: 'Something went wrong!' });
});

// Fallback to index.html for SPA (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
