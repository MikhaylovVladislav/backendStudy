
import express from 'express'
import { getProductsRoutes } from './routes/products'
import { getHomeRoutes } from './routes/home'
import { inputValidateMiddleware } from './middleware/input-validation-middleware'

export const app = express()
app.use(inputValidateMiddleware)
app.use(express.json())

app.use('/products', getProductsRoutes())
app.use('/h', getHomeRoutes())








