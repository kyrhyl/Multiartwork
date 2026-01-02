// Run with `npm run seed` after setting .env
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function seed(){
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await User.findOne({ email: 'admin@multiartwork.local' });
  if(existing) { console.log('Users already exist'); process.exit(0); }
  const adminPass = await bcrypt.hash('AdminPass123', 10);
  const editorPass = await bcrypt.hash('EditorPass123', 10);
  await User.create({ name: 'Admin User', email: 'admin@multiartwork.local', password: adminPass, role: 'admin' });
  await User.create({ name: 'Editor User', email: 'editor@multiartwork.local', password: editorPass, role: 'editor' });
  console.log('Seeded users: admin@multiartwork.local / AdminPass123, editor@multiartwork.local / EditorPass123');
  process.exit(0);
}

seed().catch(err=>{console.error(err); process.exit(1)});
