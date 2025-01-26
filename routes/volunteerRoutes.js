const express = require('express');
const { createVolunteer, listVolunteers } = require('../controllers/volunteerController');

const router = express.Router();

// Register a volunteer
router.post('/volunteer', createVolunteer);

// Fetch all volunteers
router.get('/volunteers', listVolunteers);

module.exports = router;
