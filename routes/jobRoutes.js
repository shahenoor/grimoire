import express from 'express';
import * as jobController from '../controllers/jobController.js'

const router = express.Router();

router.post('/', jobController.createJob);
router.get('/:jobId', jobController.getJobById);
router.get('/total/:userId', jobController.getTotalJobs);
router.get('/:userId/month/:month', jobController.getJobsByMonth);
router.get('/:userId/date/:date', jobController.getJobsByDate);
router.put('/:jobId', jobController.updateJob);
router.delete('/:jobId', jobController.deleteJob);
router.get('/:userId/wishlist', jobController.getWishlistJobs);


export default router;