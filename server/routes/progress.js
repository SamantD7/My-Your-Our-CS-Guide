import express from 'express';
import { getProgress, updateProgress, deleteProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getProgress);
router.get('/:roadmapId', getProgress);
router.put('/', updateProgress);
router.delete('/', deleteProgress);

export default router;
