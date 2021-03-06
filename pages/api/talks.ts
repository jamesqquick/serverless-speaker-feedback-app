import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import slugify from "slugify";
import { getSession } from '@auth0/nextjs-auth0';
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
      const talks = await prisma.talk.findMany();
      res.status(200).json({ data: talks })
    } else if (req.method === 'POST') {
      const session = getSession(req, res);
      if (!session?.user) {
        return res.status(401).json({ err: 'Unauthorized' });
      }
      const { title, conference, description, slidesLink, date } = JSON.parse(req.body);

      if (!title || !conference || !description || !slidesLink || !date) {
        return res.status(400).json({ err: "All inputs are required" })

      }

      const titleAndConference = `${title}-${conference}`.replace(/[^a-zA-Z ]/g, "");
      const talk = {
        title, conference, description, slidesLink, slug: slugify(titleAndConference), date: new Date(date)
      }
      const createdTalk = await prisma.talk.create({
        data: talk
      })
      res.status(200).json({ data: createdTalk })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "AGHHHHH" });
  }
}
