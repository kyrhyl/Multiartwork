import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(req, res){
  await dbConnect();
  if(req.method === 'GET'){
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(20).lean();
    return res.json({ posts });
  }

  if(req.method === 'POST'){
    const user = await getUserFromRequest(req);
    if(!user) return res.status(401).json({ message: 'Unauthorized' });
    const { title, slug, excerpt, content, images, tags, status } = req.body;
    const post = await Post.create({ title, slug, excerpt, content, images, tags, status: status||'draft', author: user._id });
    return res.json({ post });
  }

  return res.status(405).end();
}
