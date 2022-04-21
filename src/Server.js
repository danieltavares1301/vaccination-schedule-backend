import express from 'express';
import dotenv from 'dotenv';
import ScheduleRouter from './router/ScheduleRouter.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Database Connected...');
  })
  .catch(error => {
    console.error('Error to connected to database: ' + error.message);
  });

app.use(express.json());

app.use(cors());

app.use(ScheduleRouter);

export default app;