
const oracledb = require('oracledb');

async function matchVolunteer(incidentId) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    // Fetch incident details
    const incidentResult = await connection.execute(
      `SELECT LOCATION, NEED FROM INCIDENTS WHERE ID = :incidentId`,
      { incidentId }
    );

    if (incidentResult.rows.length === 0) {
      // Error case: No incident found
      return {
        success: false,
        message: 'Incident not found',
      };
    }

    const [incidentLocation, incidentNeed] = incidentResult.rows[0];

    // Find a matching volunteer
    const volunteerResult = await connection.execute(
      `SELECT ID, NAME, LOCATION, SKILLS FROM VOLUNTEERS 
       WHERE LOCATION = :location AND INSTR(SKILLS, :need) > 0 AND AVAILABILITY = 'Y'
       FETCH FIRST 1 ROWS ONLY`,
      { location: incidentLocation, need: incidentNeed }
    );

    if (volunteerResult.rows.length === 0) {
      // Error case: No matching volunteers available
      return {
        success: false,
        message: 'No matching volunteers available',
      };
    }

    const [volunteerId, volunteerName] = volunteerResult.rows[0];

    // Create assignment
    const assignmentResult = await connection.execute(
      `INSERT INTO ASSIGNMENTS (INCIDENT_ID, VOLUNTEER_ID, STATUS)
       VALUES (:incidentId, :volunteerId, 'Assigned') RETURNING ID INTO :id`,
      {
        incidentId,
        volunteerId,
        id: { dir: oracledb.BIND_OUT },
      },
      { autoCommit: true }
    );

    // Update volunteer status to 'Assigned'
    await connection.execute(
      `UPDATE VOLUNTEERS SET AVAILABILITY = 'N' WHERE ID = :volunteerId`,
      { volunteerId },
      { autoCommit: true }
    );

    // Return success response
    return {
      success: true,
      message: 'Volunteer assigned successfully',
      assignmentId: assignmentResult.outBinds.id[0],
      volunteer: { id: volunteerId, name: volunteerName },
    };
  } catch (err) {
    console.error('Error in matchVolunteer:', err);
    return {
      success: false,
      message: `An error occurred: ${err.message}`,
    };
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { matchVolunteer };

