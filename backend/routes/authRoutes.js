import express from 'express';
import { signupuser, login } from '../controller/authcontroller.js';

const router = express.Router();

router.post('/signup', signupuser); // ✅ Must be POST
router.post('/login', login);       // ✅ Also needed

export default router;
