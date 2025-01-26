const { matchVolunteer } = require('../models/assignmentModel');

const assignVolunteer = async (req, res) => {
  const { incidentId } = req.params;
  try {
    const assignment = await matchVolunteer(incidentId);
    res.status(200).json({
      message: 'Volunteer assigned successfully',
      assignment,
    });
  } catch (err) {
    console.error('Error assigning volunteer:', err.message);
    res.status(500).json({ error: 'Error assigning volunteer', details: err.message });
  }
};

module.exports = { assignVolunteer };
