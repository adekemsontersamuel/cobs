export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }
  
    if (req.method === 'POST') {
      const { message, model } = req.body;
      // Your logic to handle the message and model
      res.status(200).json({ response: 'Your response here' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  