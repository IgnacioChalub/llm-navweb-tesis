import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie'; // Import cookie helper

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {username, password} = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {username},
      });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {userId: user.id, username: user.username},
          process.env.JWT_SECRET as string,
          {expiresIn: '1h'},
        );

        // Set the JWT token as a cookie in the response
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // use secure cookies in production
            path: '/',
            maxAge: 3600, // 1 hour
          }),
        );

        res.status(200).json({
          message: 'Login successful',
          user: {id: user.id, username: user.username, email: user.email},
        });
      } else {
        res.status(401).json({error: 'Invalid username or password'});
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
