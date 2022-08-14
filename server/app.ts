import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: [process.env.CLIENT_URL || ''], credentials: true }));

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return res.status(200).json({ data: posts });
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      body: true,
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          message: true,
          id: true,
          parentId: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({ data: post });
});

app.post('/posts/:id/comments', async (req, res) => {
  const { postId, message, parentId } = req.body;

  const newComment = await prisma.comment.create({
    data: {
      message,
      userId: '6cb7c2fa-fb14-43d9-993b-28978f44b422',
      postId,
      parentId,
    },
    select: {
      id: true,
      message: true,
      parentId: true,
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });

  return res.status(201).json({ data: newComment });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
