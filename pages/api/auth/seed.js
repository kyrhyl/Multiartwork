// Seed endpoint — call once to create example admin and editor users.
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  await dbConnect();
  const existing = await User.findOne({ email: 'admin@multiartwork.local' });
  if(existing) return res.json({ ok: true, message: 'Already seeded' });
  const adminPass = await bcrypt.hash('AdminPass123', 10);
  const editorPass = await bcrypt.hash('EditorPass123', 10);
  await User.create({ name: 'Admin User', email: 'admin@multiartwork.local', password: adminPass, role: 'admin' });
  await User.create({ name: 'Editor User', email: 'editor@multiartwork.local', password: editorPass, role: 'editor' });
  return res.json({ ok: true });
}
