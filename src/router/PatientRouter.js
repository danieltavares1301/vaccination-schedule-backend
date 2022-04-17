import express from 'express';
import PatientController from '../controller/PatientController.js';

const patientController = new PatientController();

const router = express.Router();

// midleware
router.use(express.json());

router.get('/patient', patientController.index);

router.post('/patient', patientController.store);

export default router;
