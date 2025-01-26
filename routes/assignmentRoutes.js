const express = require('express');
const { assignVolunteer } = require('../controllers/assignmentController');

const router = express.Router();

// POST /api/assignments/:incidentId
router.post('/:incidentId', assignVolunteer);

module.exports = router;
