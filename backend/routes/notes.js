// routes/notes.js
import express from 'express';
import {
  getNotes,
  createNote,
  deleteNote,
} from '../controller/notecontroller.js';
import requireAuth from '../middleware/authmiddleware.js';

const router = express.Router();

router.use(requireAuth); // all routes below this require authentication

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;
