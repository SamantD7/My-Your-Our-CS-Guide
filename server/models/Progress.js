import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    roadmapId: {
      type: String,
      required: true,
      enum: ['dsa', 'aptitude', 'webdev', 'ai-engineer']
    },
    checkedItems: {
      type: Map,
      of: Boolean,
      default: {}
    }
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
