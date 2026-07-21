import mongoose from 'mongoose';

const customTopicSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    roadmapId: {
      type: String,
      required: true
    },
    phaseTitle: {
      type: String,
      default: 'Custom Topics'
    },
    name: {
      type: String,
      required: true
    },
    subs: [{
      type: String
    }]
  },
  { timestamps: true }
);

const CustomTopic = mongoose.model('CustomTopic', customTopicSchema);
export default CustomTopic;
