
import express from 'express'
import { getProductsRoutes } from './routes/products'
import { getHomeRoutes } from './routes/home'

export const app = express()

app.use(express.json())

app.use('/products', getProductsRoutes())
app.use('/h', getHomeRoutes())








