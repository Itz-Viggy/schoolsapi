const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', schoolRoutes);
app.use(express.static(path.join(__dirname, './pages')));

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

