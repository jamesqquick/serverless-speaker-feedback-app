import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { twilioClient } from '../../lib/twilio';
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
                },
                orderBy: [
                    { createdAt: 'desc' }
                ],
                take: 5
            });
            res.status(200).json({ data: reviews })
        } else if (req.method === 'POST') {
            const { rating, text, talkId, name } = JSON.parse(req.body);
            // UPDATE
            const review = {
                rating, text, talk: { connect: { id: talkId } }, name
            }
            const createdReview = await prisma.review.create({
                data: review
            })
            if (process.env.TEXT_ALERTS_ON === 'TRUE') {
                await twilioClient.messages.create({
                    body: `New Feedback : "${rating} - ${text}"`,
                    from: process.env.TWILIO_FROM_NUMBER,
                    to: process.env.TWILIO_TO_NUMBER,
                });
            }
            res.status(200).json({ data: createdReview })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: "AGHHHHH" });
    }
}
