const mongoose = require('mongoose');
const Post = require('../models/Post');

describe('Post model basic', ()=>{
  beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multiartwork-test');
  });
  afterAll(async ()=>{
    await mongoose.connection.close();
  });

  test('create and remove post', async ()=>{
    const p = await Post.create({ title: 'P1', slug: 'p1-'+Date.now(), excerpt: 'e', content: '<p>x</p>' });
    expect(p.title).toBe('P1');
    await Post.findByIdAndDelete(p._id);
  });
});
