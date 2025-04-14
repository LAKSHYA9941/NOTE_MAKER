// controller/noteController.js
import Note from '../models/notemodel.js';

// Get all notes for logged-in user
export const getNotes = async (req, res) => {
  const user_id = req.user._id;
  try {
    const notes = await Note.find({ user: user_id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create new note
export const createNote = async (req, res) => {
  const user_id = req.user._id;
  const { title, content } = req.body;

  try {
    const note = await Note.create({ title, content, user: user_id });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user: user_id });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted', id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
