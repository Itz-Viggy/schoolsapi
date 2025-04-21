// src/models/schoolModel.js
const pool = require('./db');

async function addSchool({ name, address, latitude, longitude }) {
  const res = await pool.query(
    `INSERT INTO schools (name, address, latitude, longitude)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [name, address, latitude, longitude]
  );
  return res.rows[0].id;
}

async function getAllSchools() {
  const res = await pool.query('SELECT * FROM schools');
  return res.rows;
}

module.exports = { addSchool, getAllSchools };
