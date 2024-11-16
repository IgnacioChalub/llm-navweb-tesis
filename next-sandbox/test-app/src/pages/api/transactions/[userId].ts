import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {userId} = req.query; // Get the user ID from the URL parameter

  if (req.method === 'GET') {
    try {
      // Validate userId
      const parsedUserId = parseInt(userId as string, 10);
      if (isNaN(parsedUserId)) {
        return res.status(400).json({error: 'Invalid user ID'});
      }

      // Retrieve transactions for the user
      const transactions = await prisma.transaction.findMany({
        where: {
          OR: [{senderId: parsedUserId}, {recipientId: parsedUserId}],
        },
        select: {
          id: true,
          date: true,
          type: true,
          amount: true,
          recipientAlias: true,
          sender: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
        take: 10,
      });

      res.status(200).json(transactions);
    } catch (error) {
      console.error('Failed to retrieve transactions:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  } else {
    // Handle non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
