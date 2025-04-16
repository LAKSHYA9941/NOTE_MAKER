import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireAuth = async (req, res, next) => {
  // Get token from Authorization header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 This line fetches the user from DB
    const user = await User.findById(id).select('_id');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 👇 Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error('❌ Auth middleware error:', err);
    res.status(401).json({ message: 'Request is not authorized' });
  }
};

export default requireAuth;
