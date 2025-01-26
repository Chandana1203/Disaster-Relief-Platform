/*const oracledb = require('oracledb');
const { addVolunteer, getVolunteers } = require('../models/volunteerModel');

async function createVolunteer(req, res) {
  const { name, location, skills, availability } = req.body;

  if (!name || !location || !skills || !availability) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await addVolunteer(name, location, skills, availability);
    res.status(201).json({ message: 'Volunteer added successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add volunteer' });
  }
}

async function listVolunteers(req, res) {
  try {
    const volunteers = await getVolunteers();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
}

module.exports = { createVolunteer, listVolunteers };
*/
const oracledb = require('oracledb');
const { addVolunteer, getVolunteers } = require('../models/volunteerModel');

async function createVolunteer(req, res) {
  const { name, location, skills, availability } = req.body;

  if (!name || !location || !skills || !availability) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await addVolunteer(name, location, skills, availability);
    console.log('Volunteer added successfully with ID:', result); // Add this line for logging
    res.status(201).json({ message: 'Volunteer added successfully', id: result });
  } catch (err) {
    console.error('Error in createVolunteer:', err); // Add this line for logging
    res.status(500).json({ error: 'Failed to add volunteer', details: err.message });
  }
}

async function listVolunteers(req, res) {
  try {
    const volunteers = await getVolunteers();
    res.status(200).json(volunteers);
  } catch (err) {
    console.error('Error in listVolunteers:', err); // Add this line for logging
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
}

module.exports = { createVolunteer, listVolunteers };