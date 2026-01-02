import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(req,res){
  await dbConnect();
  const { id } = req.query;
  if(req.method === 'GET'){
    const post = await Post.findById(id).lean();
    if(!post) return res.status(404).end();
    return res.json({ post });
  }

  const user = await getUserFromRequest(req);
  if(!user) return res.status(401).json({ message: 'Unauthorized' });

  if(req.method === 'PUT'){
    const p = await Post.findById(id);
    if(!p) return res.status(404).end();
    // editors can update, admin too
    p.title = req.body.title || p.title;
    p.slug = req.body.slug || p.slug;
    p.excerpt = req.body.excerpt || p.excerpt;
    p.content = req.body.content || p.content;
    p.images = req.body.images || p.images;
    p.tags = req.body.tags || p.tags;
    p.status = req.body.status || p.status;
    await p.save();
    return res.json({ post: p });
  }

  if(req.method === 'DELETE'){
    if(user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await Post.findByIdAndDelete(id);
    return res.json({ ok: true });
  }

  return res.status(405).end();
}
