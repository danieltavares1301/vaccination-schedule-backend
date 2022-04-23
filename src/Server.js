const express = require('express');
const dotenv = require('dotenv');
const ScheduleRouter = require('./router/ScheduleRouter.js');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Database Connected...'))
  .catch(error =>
    console.error('Error to connected to database: ' + error.message),
  );

app.get('/', (request, response) => {
  response.status(200).json({ message: 'success!' });
});

app.use(express.json());

app.use(cors());

app.use(ScheduleRouter);

module.exports = app;
