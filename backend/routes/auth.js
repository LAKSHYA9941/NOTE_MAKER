import express from 'express';
import { signupuser } from '../controller/authcontroller.js';

const router = express.Router();

router.post('/signup', signupuser);

export default router;
