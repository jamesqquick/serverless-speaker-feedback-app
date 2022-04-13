import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
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
      if (typeof req.query.talkId !== "string") {
        return res.status(400).json({ err: 'Invalid request' });
      }

      const talkId = parseInt(req.query.talkId);

      if (!talkId) {
        return res.status(400).json({ err: 'Invalid request' });
      }
      const reviews = await prisma.review.findMany({
        where: {
          talkId
        }
      });
      res.status(200).json({ data: reviews })
    } else if (req.method === 'POST') {
      const { rating, text, talkId } = JSON.parse(req.body);
      const review = {
        rating, text, talk: { connect: { id: talkId } }
      }
      const createdReview = await prisma.review.create({
        data: review
      })
      //TODO: notification somewhere
      res.status(200).json({ data: createdReview })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "AGHHHHH" });
  }
}
