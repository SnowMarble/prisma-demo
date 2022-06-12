import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (_, res: Response) => {
  res.send('hi there')
})

app.post('/add', async (req: Request, res: Response) => {
  console.log(req.config)
  const body = {
    email: req.body.email,
    name: req.body.name,
  }

  try {
    const user = await prisma.user.create({
      data: { ...body },
    })

    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send('fail to create user')
  }
})

app.get(
  '/get/:email',
  async (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).send('fail to find user')
    }
  }
)

app.listen(3000, () => console.log("server's listening on port 3000"))
