export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // Clear cookie
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
  return res.json({ ok: true });
}
