import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Post request');
  } else {
    console.log('Get request');
  }

  res.json({ success: true });
}
