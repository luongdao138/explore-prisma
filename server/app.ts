import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()

app.use(cors({ origin: [process.env.CLIENT_URL || ''], credentials: true }))


app.get('/posts', async (req, res) => {
       const prisma = new PrismaClient()

       const posts = await prisma.post.findMany({
              select: {
                      id: true, 
                      title: true
              }
        })
   

       return res.status(200).json({  data: posts})
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`)
})
