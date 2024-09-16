import express from 'express';
import * as jobController from '../controllers/jobController.js'

const router = express.Router();

router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.get('/total/:id', jobController.getTotalJobApplications);

export default router;