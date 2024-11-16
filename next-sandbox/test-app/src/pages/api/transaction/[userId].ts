// pages/api/transactions/[userId].ts

import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {userId} = req.query;
  const {type, amount, recipientId} = req.body;

  if (req.method === 'POST') {
    // Validate userId
    const parsedUserId = parseInt(userId as string, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({error: 'Invalid user ID.'});
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount specified. Amount must be a positive number.',
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {id: parsedUserId},
      });

      if (!user) {
        return res.status(404).json({error: 'User not found.'});
      }

      switch (type) {
        case 'deposit':
          await handleDeposit(user, amount);
          break;
        case 'withdrawal':
          await handleWithdrawal(user, amount);
          break;
        case 'transfer':
          if (!recipientId) {
            return res
              .status(400)
              .json({error: 'Recipient ID is required for transfers.'});
          }
          const parsedRecipientId = parseInt(recipientId, 10);
          if (isNaN(parsedRecipientId)) {
            return res.status(400).json({error: 'Invalid recipient ID.'});
          }
          await handleTransfer(user, parsedRecipientId, amount);
          break;
        default:
          return res
            .status(400)
            .json({error: 'Invalid transaction type specified.'});
      }

      res.status(200).json({message: 'Transaction completed successfully.'});
    } catch (error: any) {
      console.error('Transaction failed:', error);

      // Determine the type of error and respond accordingly
      if (error.message === 'Insufficient funds') {
        return res.status(400).json({error: 'Insufficient funds.'});
      } else if (error.message === 'Recipient not found') {
        return res.status(404).json({error: 'Recipient not found.'});
      } else {
        return res.status(500).json({error: 'Internal server error.'});
      }
    }
  } else if (req.method === 'GET') {
    // Handle GET as defined earlier
    await handleGetTransactions(req, res);
  } else {
    // Handle non-GET, non-POST requests
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}

async function handleDeposit(user: any, amount: number) {
  await prisma.transaction.create({
    data: {
      type: 'deposit',
      amount,
      recipientId: user.id,
    },
  });

  await prisma.user.update({
    where: {id: user.id},
    data: {
      balance: {increment: amount},
    },
  });
}

async function handleWithdrawal(user: any, amount: number) {
  if (user.balance < amount) {
    throw new Error('Insufficient funds');
  }

  await prisma.transaction.create({
    data: {
      type: 'withdrawal',
      amount,
      senderId: user.id,
    },
  });

  await prisma.user.update({
    where: {id: user.id},
    data: {
      balance: {decrement: amount},
    },
  });
}

async function handleTransfer(user: any, recipientId: number, amount: number) {
  if (user.balance < amount) {
    throw new Error('Insufficient funds');
  }

  const recipient = await prisma.user.findUnique({
    where: {id: recipientId},
  });

  if (!recipient) {
    throw new Error('Recipient not found');
  }

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        type: 'transfer',
        amount,
        senderId: user.id,
        recipientId: recipient.id,
      },
    }),
    prisma.user.update({
      where: {id: user.id},
      data: {
        balance: {decrement: amount},
      },
    }),
    prisma.user.update({
      where: {id: recipient.id},
      data: {
        balance: {increment: amount},
      },
    }),
  ]);
}

async function handleGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {userId} = req.query;

  // Validate userId
  const parsedUserId = parseInt(userId as string, 10);
  if (isNaN(parsedUserId)) {
    return res.status(400).json({error: 'Invalid user ID.'});
  }

  try {
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
        sender: {
          select: {
            username: true,
          },
        },
        recipient: {
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
    res.status(500).json({error: 'Internal server error.'});
  }
}
