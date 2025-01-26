const oracledb = require('oracledb');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config(); // Load environment variables

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

async function initializeDB() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

// Example db.js
module.exports = {
  initializeDB,
};

