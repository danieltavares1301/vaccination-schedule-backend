import express from 'express';
import ScheduleController from '../controller/ScheduleController.js';

const scheduleController = new ScheduleController();

const router = express.Router();

// midleware
router.use(express.json());

router.get('/schedule', scheduleController.index);

router.post('/schedule', scheduleController.store);

router.put('/schedule/:id', scheduleController.update);

export default router;
