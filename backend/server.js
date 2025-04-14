import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('./backend', '.env') }); // ✅ Forces it to load from the correct place


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import note_routes from './routes/notes.js'

import authRoutes from './routes/authRoutes.js'; // ✅ just use this one


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ routes now respond to /api/auth/signup


app.use('/api/notes', note_routes)

//check
console.log('JWT Secret:', process.env.JWT_SECRET);



mongoose.connect('mongodb://127.0.0.1:27017/note_maker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
