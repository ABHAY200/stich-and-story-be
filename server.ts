import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import productRoutes from './routes/productRoutes.js'
import { postCart, postCheckout } from './controllers/productController.js'

dotenv.config()

const app = express()

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or tools without Origin header
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
  }),
)

app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// Products routes
app.use('/api/products', productRoutes)

// Cart and checkout (simulated)
app.post('/api/cart', postCart)
app.post('/api/checkout', postCheckout)

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`stich-and-story-be listening on port ${PORT}`)
})

