require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { db } = require('./lib/db');

const clientRoutes = require('./routes/clientRoutes');
const clientJobRoutes = require('./routes/clientJobRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

// client routes
app.use('/api/clients', clientRoutes);
app.use('/api/jobs', clientJobRoutes);

// general 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

db.authenticate()
  .then(() => {
    console.log('DB Connected');

    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });
  })
  .catch((err) => console.error(err));
