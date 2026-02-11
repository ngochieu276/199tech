import app from './app';
import dotenv from 'dotenv';
import prisma from './utils/prisma';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error('Prisma connection error');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
