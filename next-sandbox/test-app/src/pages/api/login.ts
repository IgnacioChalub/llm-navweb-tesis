import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import type {ILoginBody} from 'src/app/types/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {username, password}: ILoginBody = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {username},
      });

      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: 'Login successful',
          user: {id: user.id, username: user.username, email: user.email},
        });
      } else {
        res.status(401).json({error: 'Invalid username or password'});
      }
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
