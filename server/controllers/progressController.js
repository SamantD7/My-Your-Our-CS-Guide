import Progress from '../models/Progress.js';

// @desc    Get user progress for a roadmap or all roadmaps
// @route   GET /progress or GET /progress/:roadmapId
// @access  Private
export const getProgress = async (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    let query = { userId: req.user.id };
    if (roadmapId) {
      query.roadmapId = roadmapId;
    }

    const progressRecords = await Progress.find(query);
    
    // Format response as object with roadmapId keys
    const result = {};
    progressRecords.forEach((record) => {
      result[record.roadmapId] = Object.fromEntries(record.checkedItems);
    });

    res.status(200).json({ success: true, progress: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Update progress for a roadmap
// @route   PUT /progress
// @access  Private
export const updateProgress = async (req, res, next) => {
  try {
    const { roadmapId, checkedItems } = req.body;

    if (!roadmapId || !checkedItems) {
      return res.status(400).json({ success: false, message: 'roadmapId and checkedItems are required' });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.id, roadmapId },
      { checkedItems },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      roadmapId: progress.roadmapId,
      checkedItems: Object.fromEntries(progress.checkedItems)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset progress for a roadmap
// @route   DELETE /progress
// @access  Private
export const deleteProgress = async (req, res, next) => {
  try {
    const { roadmapId } = req.query;

    if (roadmapId) {
      await Progress.findOneAndDelete({ userId: req.user.id, roadmapId });
    } else {
      await Progress.deleteMany({ userId: req.user.id });
    }

    res.status(200).json({ success: true, message: 'Progress reset successfully' });
  } catch (error) {
    next(error);
  }
};
