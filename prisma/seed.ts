import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
    },
  });

  await prisma.wallet.create({
    data: {
      name: 'My First Wallet',
      tag: 'savings',
      chain: 'Ethereum',
      address: '0x1234567890abcdef',
      balance: 1000,
      userId: user.id,
    },
  });

  console.log('Seed complete: user@example.com / 123456');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
