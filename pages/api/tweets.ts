import type { NextApiRequest, NextApiResponse } from 'next'
import { getTweets } from '../../lib/twitter';
interface RetVal {
  data?: any
  err?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RetVal>
) {
  try {

    if (req.method === 'GET') {
      const tweets = await getTweets();
      res.status(200).json({ data: tweets })
    } else {
      res.status(400).json({ err: 'Unsupported HTTP method' });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "AGHHHHH" });
  }
}
