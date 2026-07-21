import Settings from '../models/Settings.js';

// @desc    Get target dates
// @route   GET /target
// @access  Private
export const getTarget = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id, targetDates: {} });
    }

    res.status(200).json({
      success: true,
      targetDates: Object.fromEntries(settings.targetDates || new Map())
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update target date for a roadmap
// @route   PUT /target
// @access  Private
export const updateTarget = async (req, res, next) => {
  try {
    const { roadmapId, targetDate } = req.body;

    if (!roadmapId) {
      return res.status(400).json({ success: false, message: 'roadmapId is required' });
    }

    let settings = await Settings.findOne({ userId: req.user.id });
    if (!settings) {
      settings = new Settings({ userId: req.user.id, targetDates: new Map() });
    }

    if (!settings.targetDates) {
      settings.targetDates = new Map();
    }

    if (targetDate) {
      settings.targetDates.set(roadmapId, targetDate);
    } else {
      settings.targetDates.delete(roadmapId);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      targetDates: Object.fromEntries(settings.targetDates)
    });
  } catch (error) {
    next(error);
  }
};
