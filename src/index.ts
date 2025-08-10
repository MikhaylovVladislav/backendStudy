//const express = require('express')
import express from 'express'
import type {Request, Response} from 'express'
import type {RequestWithBody, RequestWithParams, RequestWithQuery, RequestWithParamsBody} from '../src/types.ts'

const app = express()
const port = process.env.PORT || 3005
const jsonBodyMeddleWare = express.json()  // req.body

app.use(jsonBodyMeddleWare)

const HTTP_STATUSES = 
  {
    OK_200: 200,
    CREATED_201: 201,
    NONCONTENT_204: 204,
  
    BADREQ_400: 400,
    NOTFOUND_404: 404
  }
  

const newID = () => {
  return new Date()
}

type ProductType = {
  id: number,
  typeTech: string,
  model: string
}

const db: {products: ProductType[]} = { products: [
  {
    id: 1, typeTech: "phone", model: "rion 9 pro" 
  },
   {
    id: 2, typeTech: "phone", model: "rion 10 lite" 
  },
   {
    id: 3, typeTech: "gpu", model: "gtx 1050ti" 
  },
   {
    id: 4, typeTech: "cpu", model: "ryzen 3 1200" 
  }
]}

app.get('/products', (req: RequestWithQuery<{typeTech: string}>, res: Response<ProductType[]>) => {
 
  let findedProduct = db.products
  if(req.query.typeTech){
     findedProduct = findedProduct
     .filter(el => el.typeTech.indexOf(req.query.typeTech as string)>-1)
     //res.sendStatus(HTTP_STATUSES.OK_200)
     
  }else{
    
  }
  res.json(findedProduct)
})
app.get('/products/:id', (req: RequestWithParams<{id: string}>, res: Response<ProductType>) => {
  const findedProduct = db.products.find(el => el.id === +req.params.id)
  if(!findedProduct){
    res.sendStatus(HTTP_STATUSES.BADREQ_400)
    return;
  }
  //res.sendStatus(HTTP_STATUSES.OK_200)
  res.json(findedProduct)
})

app.post('/products', (req: RequestWithBody<{typeTech: string, model: string}>, res: Response<ProductType>) => {
  const createdProduct = {
    id: +newID(),
    typeTech: req.body.typeTech, 
    model: req.body.model
  }
  if(!req.body.typeTech){
     res.sendStatus(HTTP_STATUSES.BADREQ_400)
     return;
  }
  if(!req.body.model){
     res.sendStatus(HTTP_STATUSES.BADREQ_400)
     return;
  }
    db.products.push(createdProduct)
    //res.sendStatus(HTTP_STATUSES.CREATED_201)
    res.send(createdProduct)
})

app.put('/products/:id', (req: RequestWithParamsBody<{id: string},{ typeTech: string, model: string}> , res: Response<ProductType[]>) => {
  let products = db.products
  products = products.filter(el => el.id == +req.params.id ? el.model=req.body.model : el)
  if(!req.body.model){
    res.sendStatus(HTTP_STATUSES.BADREQ_400)
    return;
  }
  //res.sendStatus(HTTP_STATUSES.CREATED_201)
  res.send(products)
})

app.delete('/products/:id', (req: RequestWithParams<{id: string}>, res: Response<ProductType[]>)=>{
  let products = db.products
    products=products.filter(el => el.id !== +req.params.id)
  res.send(products)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})