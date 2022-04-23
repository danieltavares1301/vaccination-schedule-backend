const express = require('express');
const ScheduleController = require('../controller/ScheduleController.js');

const scheduleController = new ScheduleController();

const router = express.Router();

// midleware
router.use(express.json());

router.get('/schedule', scheduleController.index);

router.get('/schedule/:id', scheduleController.getOne);

router.post('/schedule', scheduleController.store);

router.put('/schedule/serviceFinished/:id', scheduleController.serviceFinished);

module.exports = router;
