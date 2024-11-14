import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {verifyToken} from '../utils/verifyToken';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // Verify and decode the token
    const decodedToken = verifyToken(req, res);
    if (!decodedToken) return; // Stop if the token is invalid

    try {
      // Fetch user data from the database
      const user = await prisma.user.findUnique({
        where: {id: (decodedToken as any).userId},
        select: {id: true, username: true, email: true},
      });

      if (!user) {
        res.status(404).json({error: 'User not found'});
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
