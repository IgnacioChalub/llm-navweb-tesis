import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {userId} = req.query;
  const {type, amount, recipientId} = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: 'Invalid amount specified. Amount must be a positive number.',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {id: parseInt(userId)},
    });

    if (!user) {
      return res.status(404).json({error: 'User not found'});
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
            .json({error: 'Recipient ID required for transfer.'});
        }
        await handleTransfer(user, parseInt(recipientId), amount);
        break;
      default:
        return res
          .status(400)
          .json({error: 'Invalid transaction type specified.'});
    }

    res.status(200).json({message: 'Transaction completed successfully'});
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }
}

async function handleDeposit(user, amount) {
  await prisma.user.update({
    where: {id: user.id},
    data: {
      balance: {increment: amount},
      transactions: {
        create: {type: 'deposit', amount},
      },
    },
  });
}

async function handleWithdrawal(user, amount) {
  if (user.balance < amount) {
    throw new Error('Insufficient funds');
  }

  await prisma.user.update({
    where: {id: user.id},
    data: {
      balance: {decrement: amount},
      transactions: {
        create: {type: 'withdrawal', amount},
      },
    },
  });
}

async function handleTransfer(user, recipientId, amount) {
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
    prisma.user.update({
      where: {id: user.id},
      data: {
        balance: {decrement: amount},
        transactions: {
          create: {type: 'transfer', amount},
        },
      },
    }),
    prisma.user.update({
      where: {id: recipientId},
      data: {
        balance: {increment: amount},
        transactions: {
          create: {type: 'transfer', amount},
        },
      },
    }),
  ]);
}
