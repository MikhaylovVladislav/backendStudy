import  express  from "express"
import type {Request, Response} from 'express'
import type {RequestWithBody, RequestWithParams, RequestWithQuery, RequestWithParamsBody} from '../types/types.js'
import type { CreateProductModel } from '../models/CreateProductModel.ts'
import type { UpdateProductModel } from '../models/UpdateProductModel.ts'
import type { URIParamsProductModel } from '../models/URIParamsProductModel.ts'
import type { QueryProductsModel } from '../models/QueryProductModel.ts'
import type { ProductsViewModel } from "../models/ProductsViewModel.ts"
import type { ProductType }  from '../database/db.ts'
import { HTTP_STATUSES } from "../utils"

const newID = () => {
  return new Date()
}

export const getProductsRoutes = (db: {products: ProductType[]})=>{
    const routerProduct = express.Router({ mergeParams: true })
    const timeLog = (req:Request, res: Response, next: any) => {
        console.log('Time: ', Date.now())
        next()
    }

    routerProduct.use(timeLog)

    routerProduct.get('/', (req: RequestWithQuery<QueryProductsModel>, res: Response<ProductsViewModel[]>) => {
        let findedProduct = db.products
        if(req.query.typeTech){
        findedProduct = findedProduct
            .filter(el => el.typeTech.indexOf(req.query.typeTech as string)>-1)
        //res.sendStatus(HTTP_STATUSES.OK_200)
        }
    res.json(findedProduct)
})

routerProduct.get('/:id', (req: RequestWithParams<URIParamsProductModel>, res: Response<ProductsViewModel>) => {
    const findedProduct = db.products.find(el => el.id === +req.params.id)
    if(!findedProduct){
        res.sendStatus(HTTP_STATUSES.BADREQ_400)
        return;
    }
    //res.sendStatus(HTTP_STATUSES.OK_200)
    res.json(findedProduct)
})

routerProduct.post('/', (req: RequestWithBody<CreateProductModel>, res: Response<ProductsViewModel>) => {
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

routerProduct.put('/:id', (req: RequestWithParamsBody<URIParamsProductModel, UpdateProductModel> , res: Response<ProductsViewModel[]>) => {
    let products = db.products
    products = products.filter(el => el.id == +req.params.id ? el.model=req.body.model : el)
    if(!req.body.model){
        res.sendStatus(HTTP_STATUSES.BADREQ_400)
        return;
    }
    //res.sendStatus(HTTP_STATUSES.CREATED_201)
    res.send(products)
})

routerProduct.delete('/:id', (req: RequestWithParams<URIParamsProductModel>, res: Response<ProductsViewModel[]>)=>{
    let products = db.products
    products=products.filter(el => el.id !== +req.params.id)
    res.send(products)
})
 return routerProduct;
}