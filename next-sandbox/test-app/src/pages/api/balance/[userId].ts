import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {userId} = req.query;

  if (req.method === 'GET') {
    try {
      // Ensure the user ID is provided and valid
      if (!userId) {
        return res.status(400).json({error: 'User ID is required'});
      }

      // Convert userId to integer if it's in string format
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        return res.status(400).json({error: 'Invalid user ID provided'});
      }

      // Retrieve the user along with their balance
      const user = await prisma.user.findUnique({
        where: {id: numericUserId},
        select: {balance: true},
      });

      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }

      res.status(200).json({balance: user.balance});
    } catch (error) {
      console.error('Error retrieving user balance:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  } else {
    // If the request method is not GET, inform the client that only GET is allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
