import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myo_cs_guide');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning/Error: ${error.message}`);
    console.log('App will continue running; offline/localstorage mode active if DB is unreachable.');
  }
};

export default connectDB;
