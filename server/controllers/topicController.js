import CustomTopic from '../models/CustomTopic.js';

// @desc    Get custom topics for a user
// @route   GET /topics or GET /topics/:roadmapId
// @access  Private
export const getTopics = async (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    let query = { userId: req.user.id };
    if (roadmapId) {
      query.roadmapId = roadmapId;
    }

    const topics = await CustomTopic.find(query);
    res.status(200).json({ success: true, topics });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a custom topic or subtopic
// @route   POST /topics
// @access  Private
export const addTopic = async (req, res, next) => {
  try {
    const { roadmapId, name, subs, topicId, newSub } = req.body;

    if (!roadmapId) {
      return res.status(400).json({ success: false, message: 'roadmapId is required' });
    }

    // Adding a subtopic to an existing custom topic
    if (topicId && newSub) {
      const topic = await CustomTopic.findOne({ _id: topicId, userId: req.user.id });
      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topic not found' });
      }
      topic.subs.push(newSub);
      await topic.save();
      return res.status(200).json({ success: true, topic });
    }

    // Creating a new custom topic
    if (!name) {
      return res.status(400).json({ success: false, message: 'Topic name is required' });
    }

    const newTopic = await CustomTopic.create({
      userId: req.user.id,
      roadmapId,
      name,
      subs: subs || []
    });

    res.status(201).json({ success: true, topic: newTopic });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete custom topic or subtopic
// @route   DELETE /topics
// @access  Private
export const deleteTopic = async (req, res, next) => {
  try {
    const { topicId, subIndex, roadmapId, resetAll } = req.body || req.query;

    if (resetAll) {
      const query = { userId: req.user.id };
      if (roadmapId) query.roadmapId = roadmapId;
      await CustomTopic.deleteMany(query);
      return res.status(200).json({ success: true, message: 'Custom topics reset' });
    }

    if (!topicId) {
      return res.status(400).json({ success: false, message: 'topicId is required' });
    }

    const topic = await CustomTopic.findOne({ _id: topicId, userId: req.user.id });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    // Delete specific subtopic by index
    if (typeof subIndex === 'number' && subIndex >= 0) {
      topic.subs.splice(subIndex, 1);
      await topic.save();
      return res.status(200).json({ success: true, topic });
    }

    // Delete entire topic
    await CustomTopic.deleteOne({ _id: topicId, userId: req.user.id });
    res.status(200).json({ success: true, message: 'Topic deleted' });
  } catch (error) {
    next(error);
  }
};
