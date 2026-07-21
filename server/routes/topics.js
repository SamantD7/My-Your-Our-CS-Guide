import express from 'express';
import { getTopics, addTopic, deleteTopic } from '../controllers/topicController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getTopics);
router.get('/:roadmapId', getTopics);
router.post('/', addTopic);
router.delete('/', deleteTopic);

export default router;
