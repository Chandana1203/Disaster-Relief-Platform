const oracledb = require('oracledb');

async function addVolunteer(name, location, skills, availability,username,password) {
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING,
      });
  
       // Check for existing volunteer
    const checkResult = await connection.execute(
        'SELECT ID FROM VOLUNTEERS WHERE NAME = :name AND LOCATION = :location AND SKILLS = :skills AND AVAILABILITY = :availability AND USERNAME = :username AND PASSWORD = :password',
        { name, location, skills, availability, username, password }
      );
  
      if (checkResult.rows.length > 0) {
        // Volunteer already exists
        return checkResult.rows[0][0]; // Return existing ID
      }
      const result = await connection.execute(
        `INSERT INTO VOLUNTEERS (NAME, LOCATION, SKILLS, AVAILABILITY, USERNAME, PASSWORD)
         VALUES (:name, :location, :skills, :availability, :username, :password)
         RETURNING ID INTO :id`,
        {
          name,
          location,
          skills,
          availability,
          username,
          password,
          id: { dir: oracledb.BIND_OUT },
        },
        { autoCommit: true }
      );
  
      return result.outBinds.id[0];
    } catch (err) {
      if (err.errorNum === 1) {
        console.error('Duplicate entry detected:', err);
        throw new Error('A volunteer with the same details already exists.');
      }
    console.error('Error adding volunteer:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getVolunteers() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(`SELECT * FROM VOLUNTEERS`);
    return result.rows;
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { addVolunteer, getVolunteers };
