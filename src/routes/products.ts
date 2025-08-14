import  express  from "express"
import type {Request, Response} from 'express'
import { body } from "express-validator"
import type {RequestWithBody, RequestWithParams, RequestWithQuery, RequestWithParamsBody} from '../types/types.js'
import type { CreateProductModel } from '../models/CreateProductModel.ts'
import type { UpdateProductModel } from '../models/UpdateProductModel.ts'
import type { URIParamsProductModel } from '../models/URIParamsProductModel.ts'
import type { QueryProductsModel } from '../models/QueryProductModel.ts'
import type { ProductsViewModel } from "../models/ProductsViewModel.ts"
import { HTTP_STATUSES } from "../utils"
import { productRepository } from "../repositories/products-repositories"
import { inputValidateMiddleware } from "../middleware/input-validation-middleware"

const typeTechValidation = body('typeTech').isLength({min: 3, max: 30}).withMessage({errorMessage: "Длина должна составлять от 3 до 30"})

export const getProductsRoutes = ()=>{
    const routerProduct = express.Router({ mergeParams: true })
    const timeLog = (req:Request, res: Response, next: any) => {
        console.log('Time: ', Date.now())
        next()
    }

routerProduct.use(timeLog)

routerProduct.get('/', (req: RequestWithQuery<QueryProductsModel>, res: Response<ProductsViewModel[]>) => {
    res.json(productRepository.getProductsWithQuery(req.query.typeTech))
})

routerProduct.get('/:id', (req: RequestWithParams<URIParamsProductModel>, res: Response<ProductsViewModel>) => {
    res.json(productRepository.getProductsById(+req.params.id))
})

routerProduct.post('/', 
    typeTechValidation,
    inputValidateMiddleware, 
    (req: RequestWithBody<CreateProductModel>, res: Response<ProductsViewModel>) => {
    res.json(productRepository.createProduct(req.body.typeTech, req.body.model))

})

routerProduct.put('/:id', (req: RequestWithParamsBody<URIParamsProductModel, UpdateProductModel> , res: Response) => { //Response<ProductsViewModel[]>
    res.send(productRepository.updateProduct(+req.params.id, req.body.typeTech, req.body.model))
})

routerProduct.delete('/:id', (req: RequestWithParams<URIParamsProductModel>, res: Response)=>{
   res.json(productRepository.deleteProduct(+req.params.id))
})
 return routerProduct;
}