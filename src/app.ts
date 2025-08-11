
import express from 'express'
import  { getProductsRoutes } from './routes/products'
import { getHomeRoutes } from './routes/home'
import { db } from './database/db'

export const app = express()

app.use(express.json())

app.use('/products', getProductsRoutes(db))
app.use('/', getHomeRoutes())








