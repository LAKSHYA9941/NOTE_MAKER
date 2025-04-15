import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import noteRoutes from './routes/notes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config({ path: path.resolve('./backend', '.env') }); // ✅
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Check env loaded properly
console.log('🌱 JWT Secret:', process.env.JWT_SECRET);
console.log('📦 Mongo URI:', process.env.MONGO_URI ? 'Loaded' : 'Missing');

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
