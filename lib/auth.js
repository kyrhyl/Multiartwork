import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../models/User';
import dbConnect from './mongodb';

export function signToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function getUserFromRequest(req) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie || '') : {};
  const token = cookies.token;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return null;
    return user;
  } catch (err) {
    return null;
  }
}
