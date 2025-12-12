const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middelware
app.use(cors());
app.use(express.json());

// Verbinden met MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbonden'))
  .catch((error) => console.log(error));

// Gebruikersroutes
app.use('/api/users', userRoutes);

module.exports = app;
