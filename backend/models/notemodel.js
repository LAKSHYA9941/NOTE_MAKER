// models/noteModel.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // reference to the User model
  },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
