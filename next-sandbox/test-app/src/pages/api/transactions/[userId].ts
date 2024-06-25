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
      // Retrieve transactions for the user
      const transactions = await prisma.transaction.findMany({
        where: {
          userId: parseInt(userId as string),
        },
        select: {
          id: true,
          date: true,
          type: true,
          amount: true,
          user: {
            select: {
              username: true, // Assuming you want to show the username
            },
          },
        },
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
