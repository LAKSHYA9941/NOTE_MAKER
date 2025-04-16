import Note from '../models/notemodel.js';

export const getNotes = async (req, res) => {
  const user = req.user._id;
  try {
    const notes = await Note.find({ user }).sort({ createdAt: -1 }); // ✅ use 'user'
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createNote = async (req, res) => {
  const user = req.user._id;
  const { title, content } = req.body;
  console.log('🆕 Creating note:', req.body);
  console.log('📎 User ID from token:', req.user._id);


  try {
    const note = await Note.create({ title, content, user }); // ✅ use 'user'
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user }); // ✅ use 'user'

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted', id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

