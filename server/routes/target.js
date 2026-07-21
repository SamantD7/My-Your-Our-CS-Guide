import express from 'express';
import { getTarget, updateTarget } from '../controllers/targetController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getTarget);
router.put('/', updateTarget);

export default router;
