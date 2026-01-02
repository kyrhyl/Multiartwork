const mongoose = require('mongoose');
const dbConnect = require('../lib/mongodb');
const User = require('../models/User');

describe('Auth model basic', ()=>{
  beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multiartwork-test');
  });
  afterAll(async ()=>{
    await mongoose.connection.close();
  });

  test('can create a user', async ()=>{
    const u = await User.create({ name: 'T1', email: `t1-${Date.now()}@test`, password: 'x', role: 'editor' });
    expect(u.email).toBeDefined();
    await User.findByIdAndDelete(u._id);
  });
});
