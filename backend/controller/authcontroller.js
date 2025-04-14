import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
  console.log('🔐 JWT_SECRET inside authcontroller:', process.env.JWT_SECRET);

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

export const signupuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (err) {
    res.status(400).json({ message: err.message }); // 👈 Use `message`, not `error`
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (err) {
    res.status(400).json({ message: err.message }); // 👈 Use `message`, not `error`
  }
};
