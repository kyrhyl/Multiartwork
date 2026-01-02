import dbConnect from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(503).json({ 
      status: 'error', 
      database: 'disconnected',
      message: error.message 
    });
  }
}
