const oracledb = require('oracledb');

// Create the Incident Model
async function createIncident(incidentData) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    console.log('Database connection successful');
    const result = await connection.execute(
      `INSERT INTO INCIDENTS (NAME, CONTACT, LOCATION, NEED, URGENCY)
       VALUES (:name, :contact, :location, :need, :urgency)`,
      [incidentData.name, incidentData.contact, incidentData.location, incidentData.need, incidentData.urgency],
      { autoCommit: true }
    );
    return result;
  } catch (err) {
    console.error('Error inserting incident:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getIncidents() {
  let connection;
  try {
    connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING,
          });
   
    const result = await connection.execute(`SELECT * FROM INCIDENTS`);
    return result.rows; // Return incident data
  } catch (err) {
    console.error('Error fetching incidents:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createIncident, getIncidents };
