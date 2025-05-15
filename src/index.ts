import express from 'express';
import prisma from './lib/prisma';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes); 

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
