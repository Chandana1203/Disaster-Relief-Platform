const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// Route to create an incident
router.post('/incident', incidentController.createIncident);

// Route to get all incidents
router.get('/incidents', incidentController.getIncidents);

module.exports = router;
