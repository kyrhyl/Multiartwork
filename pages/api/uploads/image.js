import cloudinary from 'cloudinary';
import dbConnect from '../../../lib/mongodb';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { dataUrl } = req.body;
  if(!dataUrl) return res.status(400).json({ message: 'No dataUrl provided' });
  try{
    const result = await cloudinary.v2.uploader.upload(dataUrl, { folder: 'multiartwork' });
    return res.json({ url: result.secure_url });
  } catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Upload failed' });
  }
}
