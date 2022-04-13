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
      console.log("post")
      //only authenticated users
      const session = getSession(req, res);
      console.log(session)
      if (!session?.user) {
        return res.status(401).json({ err: 'Unauthorized' });
      }
      const { title, conference, description, slidesLink } = JSON.parse(req.body);

      if (!title || !conference || !description || !slidesLink) {
        return res.status(400).json({ err: "All inputs are required" })

      }

      const titleAndConference = `${title}-${conference}`.replace(/[^a-zA-Z ]/g, "");
      const talk = {
        title, conference, description, slidesLink, slug: slugify(titleAndConference)
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
