const db = require('./db');

async function addSchool({ name, address, latitude, longitude }) {
  const [result] = await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
  return result.insertId;
}

async function getAllSchools() {
  const [rows] = await db.query('SELECT * FROM schools');
  return rows;
}

module.exports = { addSchool, getAllSchools };
