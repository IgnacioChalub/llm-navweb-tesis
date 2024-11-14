import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Define the users to be seeded
  const users = [
    {
      username: 'beltranbulbarella',
      email: 'beltran@mail.com',
      password: 'Beltran1234!',
    },
    {
      username: 'ignacioberdiñas',
      email: 'ignacio@mail.com',
      password: 'Ignacio1234!',
    },
    {
      username: 'ignaciochalub',
      email: 'nacho@mail.com',
      password: 'Nacho1234!',
    },
  ];

  for (const user of users) {
    // Check if the user already exists to prevent duplicates
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      console.log(`User with email ${user.email} already exists. Skipping...`);
      continue;
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        // Optionally, you can set an initial balance or other fields here
        balance: 100.0,
      },
    });

    console.log(`Created user: ${user.username}`);
  }
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
