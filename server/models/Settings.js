import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    },
    targetDates: {
      type: Map,
      of: String,
      default: {}
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
