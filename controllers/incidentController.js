const oracledb = require('oracledb');

const incidentModel = require('../models/incidentModel');

// Controller to create a new incident
async function createIncident(req, res) {
  const { name, contact, location, need, urgency } = req.body;

  if (!name || !contact || !location || !need || !urgency) {
    return res.status(400).send('All fields are required');
  }

  try {
    const incidentData = { name, contact, location, need, urgency };
    console.log('Received incident data:', incidentData); // Logging received data
    await incidentModel.createIncident(incidentData);
    res.status(201).send('Incident reported successfully');
  } catch (err) {
    console.error('Error reporting incident:', err); // Logging error
    res.status(500).send('Error reporting incident');
  }
}
// Controller to get all incidents
/*async function getIncidents(req, res) {
  try {
    const incidents = await incidentModel.getIncidents();
    res.status(200).json(incidents);
  } catch (err) {
    console.error('Error fetching incidents:', err.stack);
    res.status(500).send('Error fetching incidents');
  }
}*/
async function getIncidents(req, res) {
    let connection;
    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute(`SELECT * FROM INCIDENTS`);
      console.log(result.rows); // Check the result in the logs
      res.status(200).json(result.rows); // Send rows as response
    } catch (err) {
      console.error('Error fetching incidents:', err.stack);
      res.status(500).send('Error fetching incidents');
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
  
module.exports = { createIncident, getIncidents };
