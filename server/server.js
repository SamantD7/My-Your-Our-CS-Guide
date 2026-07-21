import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import progressRoutes from './routes/progress.js';
import targetRoutes from './routes/target.js';
import topicRoutes from './routes/topics.js';

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);

// Attach Clerk authentication middleware
app.use(clerkMiddleware());

// Routes
app.use('/progress', progressRoutes);
app.use('/api/progress', progressRoutes);

app.use('/target', targetRoutes);
app.use('/api/target', targetRoutes);

app.use('/topics', topicRoutes);
app.use('/api/topics', topicRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
