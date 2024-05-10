import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, username, password } = req.body;
    if (req.method === 'POST') {
        try {
            // Check if the email or username already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ],
                },
            });

            if (existingUser) {
                return res.status(409).json({ error: 'Email or username already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                },
            });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
