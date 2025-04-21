const express = require('express');
const router = express.Router();
const { createSchool, listSchools } = require('../controllers/schoolController');

router.post('/addSchool', createSchool);
router.get('/listSchools', listSchools);

module.exports = router;
