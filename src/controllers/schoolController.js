const { addSchool, getAllSchools } = require('../models/schoolModel');

function validateSchoolData(data) {
  const { name, address, latitude, longitude } = data;
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return 'All fields (name, address, latitude, longitude) are required.';
  }
  if (typeof name !== 'string' || typeof address !== 'string') {
    return 'Name and address must be strings.';
  }
  if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
    return 'Latitude and longitude must be valid numbers.';
  }
  return null;
}

// Haversine formula to compute distance (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2
          + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
          * Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.createSchool = async (req, res) => {
  const error = validateSchoolData(req.body);
  if (error) return res.status(400).json({ error });

  try {
    const id = await addSchool(req.body);
    res.status(201).json({ message: 'School added', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'latitude and longitude query parameters required.' });
  }
  const userLat = parseFloat(latitude), userLon = parseFloat(longitude);
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'latitude and longitude must be numbers.' });
  }

  try {
    const schools = await getAllSchools();
    const sorted = schools
      .map(s => ({
        ...s,
        distance: calculateDistance(userLat, userLon, s.latitude, s.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error.' });
  }
};
